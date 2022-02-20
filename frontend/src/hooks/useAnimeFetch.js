import { useState, useEffect } from "react";
import API from '../API';
import { isPersistedState } from "../helpers";

export const useAnimeFetch = animeId => {
    const [state, setState] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                setError(false);
                setLoading(true);

                const anime = await API.fetchAnime(animeId);
                const songs = await API.fetchSongs(animeId);

                setState({
                    ...anime,
                    songs: songs,
                })
                
                setLoading(false);
            } catch (e) {
                setError(true);
            }
        }

        const sessionState = isPersistedState(animeId);

        if (sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchAnime();
    }, [animeId])

    useEffect(() => {
        sessionStorage.setItem(animeId, JSON.stringify(state));
    }, [animeId, state])

    return { state, loading, error };
}