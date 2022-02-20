import React from "react";

// Components
import SearchBar from "./SearchBar";
import Thumbnail from "./Thumbnail";
import Button from "./Button";
import Grid from "./Grid";

// Hooks
import { useAnimeListFetch } from '../hooks/useAnimeListFetch';

const Home = () => {
    const {
        state,
        error,
        searchTerm,
        setSearchTerm,
        setIsLoadingMore
    } = useAnimeListFetch();

    if (error) return(<div>Something went wrong...</div>);

    return (
        <React.Fragment>
            <SearchBar setSearchTerm={setSearchTerm} />
            <Grid header={searchTerm ? searchTerm : "Suggested Anime"} >
                {state.results.map(anime => (
                    <Thumbnail 
                        clickable={true}
                        image={anime.thumb}
                        animeId={anime._id}
                        key={anime._id}
                    />
                ))}
            </Grid>
            {state.page < state.total_pages && (
                <Button text="Load More" callback={() => setIsLoadingMore(true)} />
            )}
        </React.Fragment>
    )
}

export default Home;