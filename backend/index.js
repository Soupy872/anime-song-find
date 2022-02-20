import express from "express";
import mongodb from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import SongsDAO from "./dao/songsDAO.js";
import AnimeDAO from "./dao/animeDAO.js";
import ArtistsDAO from "./dao/artistsDAO.js";
import AnimeCTRL from "./api/anime.controller.js"
import SongsCTRL from "./api/songs.controller.js"
const app = express();

// https://docs.mongodb.com/drivers/node/current/fundamentals/

const MongoClient = mongodb.MongoClient;
dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

MongoClient.connect(
  process.env.ANIMESONGS_DB_URI,
  {
    useNewUrlParser: true,
  }
  ).catch(err => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await AnimeDAO.injectDB(client);
    await SongsDAO.injectDB(client);
    await ArtistsDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    })
  });


app.get('/api/v1/anime', AnimeCTRL.apiGetAnime)

app.get('/api/v1/anime/addanime', function (req, res) {
    res.send('Testing this route')
})

app.get('/api/v1/anime/:id', AnimeCTRL.apiGetAnimeById)

app.get('/api/v1/anime/:id/songs', SongsCTRL.apiGetSongs)

app.post('/api/v1/anime/scrapeanime', AnimeCTRL.apiScrapeAnime)

app.delete("/api/v1/anime/deleteanime", AnimeCTRL.apiDeleteAnime)