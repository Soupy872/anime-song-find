import { useState, useEffect, useCallback } from "react";
import API from '../API';
import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
}

export const useAnimeListFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchAnimes = useCallback(async (page, searchTerm = "") => {
        try {
            setError(false);
            
            const animes = await API.fetchAnimes(searchTerm, page);
            console.log(animes.anime)
            setState(prev => ({
                ...animes.anime,
                results: page >= 1 ? [...prev.results, ...animes.anime.results] : [...animes.anime.results],
            }))
            console.log(state)
        } catch(e) {
            setError(e)
        }
    }, [searchTerm])

    // Search and Initial
    useEffect(() => {
        if (!searchTerm) {
            fetchAnimes(0, searchTerm);
            const sessionState = isPersistedState('homeState');

            if (sessionState) {
                setState(sessionState);
                return;
            }
        }

        setState(initialState);
        fetchAnimes(0, searchTerm);
    }, [searchTerm, fetchAnimes])

    // Load more
    useEffect(() => {
        if (!isLoadingMore) return;

        fetchAnimes(parseInt(state.page) + 1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page, fetchAnimes])

    // Write to session storage
    useEffect(() => {
        if (!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));
    }, [searchTerm, state])

    return { state, error, searchTerm, setSearchTerm, setIsLoadingMore }
}