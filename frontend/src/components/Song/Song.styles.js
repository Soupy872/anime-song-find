import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    width: 100%;
    max-width: 300px;
    max-height: 300px;
    margin: 10px;
    padding: 10px;
    padding-bottom: 0;

    background: rgb(2,0,36);
    background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,121,121,0.9026961126247374) 35%, rgba(0,212,255,1) 100%);
    color: var(--lightGrey);
    font-size: var(--fontMed);
    border-radius: 15px 15px 0 0;
    overflow: hidden;

    h3 {
        margin: 0;
        padding: 5px;
    }

    h4 {
        margin: 0;
        padding: 0px;
        padding-bottom: 15px;
    }

    @media screen and (max-width: 768px) {
        h3 {
            font-size: var(--fontSmall);
        }

        h4 {
            font-size: 0.8rem;
        }
    }
`;

export const Content = styled.div`
    display: inline-block;
    margin-top: auto;
    width: calc(100% + 28px);
    bottom: 0;
`;

export const Button = styled.button`
    color: #118dda;
    background-color: white;
    width: calc(50% - 4px);
    height: 45px;
    padding: 0;
    border-style: none;
    border: 2px solid #118dda;
    text-decoration: none;

    :hover {
        color: white;
        background-color: #118dda;   
    }
`;

export const DisButton = styled.button`
    color: var(--medGrey);
    background-color: var(--lightGrey);
    opacity: 0.9;
    border-style: none;
    border: 2px solid var(--darkGrey);
    pointer-events: none;
    width: calc(50% - 4px);
    height: 45px;
`;