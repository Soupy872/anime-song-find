import React from "react";
import { Wrapper, Website, Section, InfoFrom } from "./Header.styles";
import MALLogo from '../../images/MyAnimeList_Logo.png';

const Header = () => (
    <Wrapper>
            <Website><a href="/">AniSong Finder</a></Website>
            <Section><a href="/">Anime</a></Section>
            {
                //<Section><a href="/songs">Songs</a></Section>
            }
            <InfoFrom>info from <a href="https://myanimelist.net/"><img src={MALLogo} alt="MyAnimeList Logo" /></a></InfoFrom>
    </Wrapper>
)

export default Header;