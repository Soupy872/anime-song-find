import AnimeDAO from "../dao/animeDAO.js";

export default class AnimeController {
    static async apiGetAnimeById(req, res, next) {
        try {
            let id = req.params.id;
            let anime = await AnimeDAO.getAnimeById(id);
            if (!anime) {
                res.status(404).json({ error: 'Not Found' });
                return;
            }
            res.json(anime);
        } catch (e) {
            console.log(`api: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetAnime(req, res, next) {
        try {
            let filters = {};
            let page = req.query.page;
            if (req.query.name) {
                filters.name = req.query.name;
            }

            const animeList = await AnimeDAO.getAnime({
                filters,
                page
            })

            let response = {
                anime: animeList
            }

            res.json(response);
        } catch (e) {
            console.log(`api: ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiAddAnime (req, res, next) {
        try {
            let [ name, englishName ] = req.body;
            const response = await AnimeDAO.addAnime(name, englishName)
            return res.json({ status: 'success' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteAnime(req, res, next) {
        try {
            let id = req.body.id;
            let anime = await AnimeDAO.deleteAnime(id);
            if (!anime) {
                res.status(404).json({ error: "Not Found" });
                return;
            }
            res.json(anime);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiScrapeAnime(req, res, next) {
        try {
            let url = req.body.url;
            const AddResponse = await AnimeDAO.scrapeAnime(url);
            res.json({ status: 'success' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}