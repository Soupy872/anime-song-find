import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let artists;

export default class ArtistsDAO {
    static async injectDB(conn) {
        if (artists) return;
        try {
            artists = await conn.db(process.env.ANIME_NS).collection("artists");
            //artists.deleteMany({})
        } catch (e) {
            console.error(`Unable to establish a collection handle in artistsDAO: ${e}`);
        }
    }

    static async getArtistById(id) {
        const result = artists.findOne({ _id: ObjectId(id) });
        return result;
    }

    static async scrapeArtists(newArtists) {
        const songArtists = [];
        try {
            for (let i = 0; i < newArtists.length; i++) {
                const artist = newArtists[i].trim();
                if (artist === 'eat' || artist === 't') continue;
                
                const artistDoc = await artists.findOneAndUpdate({ name: artist }, { $set: { name: artist } }, { upsert: true, returnNewDocument: true });
                songArtists.push({
                    id: artistDoc.lastErrorObject.upserted ? artistDoc.lastErrorObject.upserted : artistDoc.value._id,
                    artist: artist,
                });
            }
            return songArtists;
        } catch (e) {
            console.error(e);
        }
    }
}
