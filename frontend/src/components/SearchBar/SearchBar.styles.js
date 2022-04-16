import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 75px;
    background-color: rgba(74, 56, 36, 0.2);
    padding: 0 50px;
`;

export const Content = styled.div`
    postion: relative;
    max-width: var(--maxWidth);
    width: 100%;
    height: 50px;
    background: white;
    margin: 0 auto;
    border: 2px solid #27244a;
    border-radius: 25px;
    color: var(--lightGrey);

    input {
        position: absolute;
        max-width: var(--maxWidth);
        width: calc(100% - 130px);
        border: 0;
        font-size: var(--fontBig);
        background: transparent;
        height: 46px;
        padding: 0 20px;
        margin: 0px 10px;
        color: var(--medGrey);

        :focus {
            outline: none;
        }
    }


`;