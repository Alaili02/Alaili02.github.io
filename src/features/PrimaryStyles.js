import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background-color: ${props => props.theme.backgroundColor};
        color: ${props => props.theme.fontColor};
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        transition: all 0.2s ease;
    }
`;

export const MainContentWrapper = styled.div`
    margin-top: ${props => props.theme.navHeight};
`;

export const Button = styled.button`
    box-sizing: content-box;
    height: 3vh;
    font-size: 1em;
    margin: 0 1rem;
    padding: 0 1em;
    border-radius: 3px;
    outline: none;
    cursor: pointer;

    /* Color the border and text with theme.main */
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.mainAccent};
    border: 2px solid ${props => props.theme.mainAccent};

    transition: border-color 0.2s ease;
    transition: background-color 0.2s ease;
    :hover {
        color: ${props => props.theme.fontColor};
        border: 2px solid ${props => props.theme.fontColor};
    }
`;

export const H1 = styled.h1`
    color: blue;
`;

export const GridHeader = styled.h3`
    grid-column: label-start / input-end;
    text-align: center;
    margin: 0;
    margin-bottom: 0.5rem;
    padding: 0.25rem 0;
    border-bottom: solid 2px ${props => props.theme.mainAccent};
`;

export const GridLabel = styled.label`
    font-weight: bolder;
    grid-column: label-start / label-end;
    grid-row: span 1;
`;