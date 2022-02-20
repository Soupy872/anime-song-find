import express from "express";
import cors from "cors";
import router from './api/anime.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/anime/addanime', function (req, res) {
    res.send('Testing this route')
})

app.use("/api/v1/anime", require('./api/anime.route.js'));
app.use("*", (req, res) => res.status(404).json({ error: 'not found' }));

export default app;