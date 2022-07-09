import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { selectThemeFontColor, selectThemeMainAccent } from '../../store/themeSlice.js';
import { Button } from '../PrimaryStyles.js';
import ThemeButton from './ThemeButton.js'

const Nav = styled.nav`
    z-index: 10;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    position: fixed;
    height: ${props => props.theme.navHeight};
    top: 0;
    width: 100%;
    border-top: 3px solid ${props => props.theme.mainAccent};
    background-color: ${props => props.theme.backgroundColor};

    -webkit-box-shadow: 0 0.005em 0.5em rgba(0,0,0,0.75);
    -moz-box-shadow: 0 0.005em 0.5em rgba(0,0,0,0.75);
    box-shadow: 0 0.005em 0.5em rgba(0,0,0,0.75);

    > :first-child {
        margin-left: 1rem;
    }

    > :last-child {
        margin-left: auto;
    }

    > a {
        margin: 0 0.5rem;
        height: 60%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        text-decoration: none;
    }
`;

const StyledButton = styled(Button)`
    height: 100%;
    min-width: fit-content;
    box-sizing: border-box;
    margin: 0 0;
    ${props => {
        if (props.value === props.selectedPage) {
            return (
                'border-color: ' + selectThemeFontColor(props) + ';'+
                'color: ' + selectThemeFontColor(props) + ';'+
                'background-color:' + selectThemeMainAccent(props) + ';'
                );
        }
    }}
`;

const Navbar = () => {
    const [selectedPage, setSelectedPage] = useState(useLocation().pathname);
    const setActive = e => {
        setSelectedPage(e.target.value);
    }
    return (
    <Nav>
        <Link to='/'>
            <StyledButton onClick={setActive} value='/' selectedPage={selectedPage}>Resume</StyledButton>
        </Link>
        <Link to='/theme'>
            <StyledButton onClick={setActive} value='/theme' selectedPage={selectedPage}>Modify Theme</StyledButton>
        </Link>
        <Link to='/schedule_builder'>
            <StyledButton onClick={setActive} value='/schedule_builder' selectedPage={selectedPage}>Schedule Builder</StyledButton>
        </Link>
        <ThemeButton>Toggle</ThemeButton>
    </Nav>
);}

export default Navbar;