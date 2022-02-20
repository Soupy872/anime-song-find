import mongodb from "mongodb";
import ArtistsDAO from "./artistsDAO.js";
const ObjectId = mongodb.ObjectId;

let songs;

export default class SongsDAO {
    static async injectDB(conn) {
        if (songs) return;
        try {
            songs = await conn.db(process.env.ANIME_NS).collection("songs");
        } catch (e) {
            console.error(`Unable to establish a collection handle in songsDAO: ${e}`);
        }
    }

    static async getSongs(animeId) {
        const cursor = await songs.find({ anime: ObjectId(animeId) });
        const songResults = await cursor.toArray();

        return songResults;
    }

    static async scrapeSong(html, animeId) {
        //title, op/end
        const title = html.find('.theme-song-title').text().slice(1).replace('"','') ? html.find('.theme-song-title').text().slice(1).replace('"','') : html.text().split(/[""]/)[1].trim();

        // get artists and save them
        const potArtists = html.find('.theme-song-artist').text().slice(4).split(/[f.]/);
        //console.log(potArtists)
        const songArtists = await ArtistsDAO.scrapeArtists(potArtists);

        
        // get links
        const links = [];
        html.find("input").each(function() {
            const link = this.attribs.value ? this.attribs.value : null;
            links.push(link);
        });
        const [ spotify, apple, amazon, youtube ] = links;

        const songDoc = {
            title: title,
            anime: animeId,
            artist: songArtists,
            spotify,
            apple,
            amazon,
            youtube,
        }
        // Update/save song to db
        await songs.findOneAndUpdate({ title: songDoc.title }, { $set: songDoc }, { upsert: true });

    }

    static async deleteSongById(id) {
        const deletedSong = await songs.deleteOne({ _id: ObjectId(id) });
            
        return deletedSong;
        
    }

    static async deleteAnimeSongs(animeId = '0000' ) {
        const deletedSongs = await songs.deleteMany({ anime: ObjectId(animeId) })
        return deletedSongs;
    }
}