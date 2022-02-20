import express from "express";
import AnimeCTRL from "./anime.controller.js"

const router = express.Router();

router.get('/addanime', function (req, res) {
    res.send('Testing this route')
});

router.post('/addanime', AnimeCTRL.apiScrapeAnime)

router.route('/id/:id');

router.route('/songs');

router.route('/artists');

export default router;