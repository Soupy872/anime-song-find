import {
    API_URL,
} from './config';

const apiSettings = {
    fetchAnimes: async (searchTerm, page) => {
        const endpoint = searchTerm ? `${API_URL}?name=${searchTerm}&page=${page}` : `${API_URL}?page=${page}`;
        return await (await fetch(endpoint)).json()
    },
    fetchAnime: async animeId => {
       const endpoint = `${API_URL}/${animeId}`;
       return await (await fetch(endpoint)).json(); 
    },
    fetchSongs: async animeId => {
        const songsEndpoint = `${API_URL}/${animeId}/songs`;
        return await (await fetch(songsEndpoint)).json();
    }
}

export default apiSettings;