import React from "react";
import { useParams } from "react-router-dom";
import { useAnimeFetch } from "../hooks/useAnimeFetch";

import AnimeInfo from "./AnimeInfo";
import Grid from "./Grid";
import Song from "./Song";

const Anime = () => {
    const { animeId } = useParams();

    const { state: anime, loading, error } = useAnimeFetch(animeId);
    console.log(anime)

    if (loading) return <div>loading</div>;
    if (error) return <div>Something went wrong...</div>

    return (
        <React.Fragment>
            <AnimeInfo {...anime} />
            <Grid header="Songs" >
                {anime.songs?.map(song => (
                    <Song {...song} key={song._id} />
                ))}
            </Grid>
            
        </React.Fragment>
    )
}

export default Anime;