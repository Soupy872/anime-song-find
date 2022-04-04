import styled from "styled-components";

export const Wrapper = styled.div`
    margin: auto;
    padding: 40px 20px;
    background: ${({backdrop}) => 
        backdrop ? `url(${backdrop})` : '#000'
    };
    background-size: 150px;
`;

export const Content = styled.div`
    display: flex;
    margin: 0 auto;
    max-width: var(--maxWidth);
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20px;

    img {
        width: 100%;
        max-width: 300px;
    }
`;

export const Text = styled.div`
    padding: 90px; 
    color: var(--white);
    overflow: hidden;

    @media screen and (max-width: 768px) {
        padding: 10px;

        h1 {
            font-size: var(--fontMed);
        }

        h2 {
            font-size: var(--small);
        }
    }
`;