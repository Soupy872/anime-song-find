import SongsDAO from "../dao/songsDAO.js";

export default class SongsController {
    static async apiGetSongs(req, res, next) {
        let animeId = req.params.id;

        let response = await SongsDAO.getSongs(animeId)
        res.json(response)
    }

    static async apiDeleteSongById(req, res, next) {
        let id = req.params.id;

        let song = await SongsDAO.deleteSongById(id);
        if (!song) {
            res.status(404).json({ error: "Not Found" });
            return;
        }
        res.json(song) 
    }
}