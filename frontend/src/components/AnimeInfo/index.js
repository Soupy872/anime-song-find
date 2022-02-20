import React from "react";
import Thumbnail from "../Thumbnail";
import { Wrapper, Content, Text } from './AnimeInfo.styles';

const AnimeInfo = ({ img, thumb, name, english, _id }) => (
    <Wrapper backdrop={thumb} >
        <Content>
            <Thumbnail clickable={false} animeId={_id} image={img} />
            <Text>
                <h1>{name}</h1>
                <h2>{english}</h2>
            </Text>
        </Content>
    </Wrapper>
)

export default AnimeInfo;