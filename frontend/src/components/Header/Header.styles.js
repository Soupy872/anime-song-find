import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    height: 100px;
    background-color: var(--darkGrey);
    color: white;

    a {
        text-decoration: none;
        color: white;
    }

    @media screen and (max-width: 768px) {
        display: block;
        padding: 10px;
        height: auto;
    }
`;

export const Website = styled.div`
    margin-left: 20px;
    padding: 6px 8px;
    font-size: var(--fontSuperBig);
    border: 2px solid white;
    border-radius: 15px;

    @media screen and (max-width: 768px) {
        margin: auto;
        text-align: center;
    }
`;

export const Section = styled.div`
    padding: 20px 0 0 30px;
    font-size: var(--fontBig);

    @media screen and (max-width: 768px) {
        margin: auto;
        padding: 10px;
        text-align: center;
    }
`;

export const InfoFrom = styled.div`
    padding: 10px;
    margin-left: auto;
    margin-bottom: 15px;
    font-size: var(--fontBig);
    font-family: 'Brush Script MT';

    img {
        width: 70px;
        margin-left: 5px;
        margin-bottom: -15px;
        border-radius: 10px;
    }

    @media screen and (max-width: 768px) {
        margin: auto;
        padding: 10px;
        height: 75px;
        text-align: center;

        img {
            width: auto;
            height: 100%;
        }
    }
`;