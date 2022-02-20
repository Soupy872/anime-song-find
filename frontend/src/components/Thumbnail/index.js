import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image } from "./Thumbnail.styles";

const Thumbnail = ({image, clickable, animeId}) => (
        <div>
            {clickable ? (
                <Link to={`/anime/${animeId}`}>
                    <Image key={animeId} src={image} alt="thumbnail" />
                </Link>
            ) : (
                <Image key={animeId} src={image} alt="thumbnail" />
            )}
        </div>
);


Thumbnail.propTypes = {
    image: PropTypes.string,
    clickable: PropTypes.bool,
    animeId: PropTypes.string,
}

export default Thumbnail;
