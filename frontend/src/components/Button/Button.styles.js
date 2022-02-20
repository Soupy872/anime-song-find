import styled from "styled-components";

export const Wrapper = styled.button`
    display: block;
    margin: 20px auto;
    width: 15%;
    min-width: 200px;
    height: 60px;
    font-size: var(--fontBig);
    border: none;
    border-radius: 25px;
    background: var(--medGrey);
    color: white;
    transition: all 0.3s;
    animation: animateButton 0.5s;
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }

    @keyframes animateButton {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
