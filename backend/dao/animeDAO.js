import mongodb from "mongodb";
import SongsDAO from "./songsDAO.js";
import cheerio from "cheerio";
import axios from "axios"
const ObjectId = mongodb.ObjectId;


let anime;

export default class AnimeDAO {
    static async injectDB(conn) {
        if (anime) return;
        try {
            anime = await conn.db(process.env.ANIME_NS).collection("anime");
        } catch (e) {
            console.error(`Unable to establish a collection handle in animeDAO: ${e}`);
        }
    }

    static async getAnimeById(id) {
        const result = anime.findOne({ _id: ObjectId(id) });
        return result;
    }

    static async getAnime({
        filters = null,
        page = 0,
        animePerPage = 20,
    } = {}) {
        let query;
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters['name'] } };
            }

            let cursor;

            try {
                cursor = await anime.find(query);
            } catch (e) {
                console.error(`Unable to issue find command: ${e}`);
            }

            let total_results = await cursor.count()
            let total_pages = parseInt(total_results / animePerPage) + 1;

            const displayCursor = cursor.limit(animePerPage).skip(animePerPage * page)

            try {
                const results = await displayCursor.toArray()
                return {page, results, total_pages, total_results};
            } catch (e) {
                console.error(`Unable to convert cursor to array, ${e}`);
                return [page = 0, results = [], total_pages = 0, total_results = 0];
            }
        }
    }

    static async addAnime(name, englishName = null) {
        const animeDoc = {
            name,
            english: englishName,
        }

        const animeResult = await anime.findOneAndUpdate({ name: animeDoc.name }, { $set: animeDoc }, { upsert: true, returnNewDocument: true });
        return animeResult;
    }

    static async scrapeAnime(url) {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const animeDoc = {
            name: '',
            english: null,
        };

        // Scrape Title(s)
        animeDoc.name = $('.title-name', html).text();
        if ($('.title-english')) {
            animeDoc.english = $('.title-english').text();
        };

        animeDoc.thumb = $('#content > table > tbody > tr > td.borderClass > div > div:nth-child(1) > a > img', html).attr('data-src')      

        async function getImg(url) {
            const imgUrl = url.indexOf('?') !== -1 ? (url.substring(0, url.indexOf('?')) + '/pics') : (url + '/pics')
            console.log(imgUrl)
            const response = await axios.get(imgUrl);
            const html = response.data;
            const $ = cheerio.load(html);

            const img = $('#content > table > tbody > tr > td:nth-child(2) > div.js-scrollfix-bottom-rel > table > tbody > tr:nth-child(1) > td:nth-child(2) > div.picSurround > a', html).attr('href');

            return img;
        }

        animeDoc.img = await getImg(url);

        const animeResult = await anime.findOneAndUpdate({ name: animeDoc.name }, { $set: animeDoc }, { upsert: true, returnNewDocument: true });
        const animeId = animeResult.lastErrorObject.upserted ? animeResult.lastErrorObject.upserted : animeResult.value._id

        $('td', html).filter("[width='84%']").each(async function() {
            const html = $(this);
            await SongsDAO.scrapeSong(html, animeId);
        });
    }

    static async deleteAnime(id) {
        console.log(id)
        const deletedAnime = await anime.findOneAndDelete({ _id: ObjectId(id) });
        const deletedSongs = await SongsDAO.deleteAnimeSongs(id);

        return [deletedAnime, deletedSongs];
    }
}