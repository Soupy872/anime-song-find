import React from "react";
import { Wrapper, Content, Button, DisButton } from "./Song.styles";

const Song = ({ title, artist, spotify, apple, amazon, youtube }) => {
    const handleOnClick = (link) => {
        window.open(link)
    }

    return (
        <Wrapper>
            <h3>{title}</h3>
            <h4>by {artist?.map((artis, i, artist) => {
                if (i + 1 === artist.length) return artis.artist;
                return artis.artist + ", "
            })}</h4>
            <Content>
                {spotify ? (
                    <Button onClick={() => handleOnClick(spotify)}>Spotify</Button>
                ) : (
                    <DisButton>Spotify</DisButton>
                )}
                {apple ? (
                    <Button onClick={() => handleOnClick(apple)}>Apple</Button>
                ) : (
                    <DisButton>Apple</DisButton>
                )}
                {amazon ? (
                    <Button onClick={() => handleOnClick(amazon)}>Amazon</Button>
                ) : (
                    <DisButton>Amazon</DisButton>
                )}
                {youtube ? (
                    <Button onClick={() => handleOnClick(youtube)}>Youtube</Button>
                ) : (
                    <DisButton>Youtube</DisButton>
                )}
            </Content>
        </Wrapper>
    )
}

export default Song;