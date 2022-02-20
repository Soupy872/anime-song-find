import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 75px;
    background: var(--medGrey);
    padding: 0 50px;
`;

export const Content = styled.div`
    postion: relative;
    max-width: var(--maxWidth);
    width: 100%;
    height: 50px;
    background: var(--lightGrey);
    margin: 0 auto;
    border-radius: 10px;
    color: white;

    input {
        position: absolute;
        border: 0;
        font-size: var(--fontBig);
        background: transparent;
        height: 50px;
        padding: 0 20px;
        margin: 0px 10px;
        color: var(--medGrey);

        :focus {
            outline: none;
        }
    }
`;