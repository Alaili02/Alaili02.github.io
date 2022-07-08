import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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

    > :last-child {
        margin-left: auto;
    }

    > a {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        text-decoration: none;
    }
`;

const StyledLink = styled(Link)`
    color: green;
`;

const Navbar = () => (
    <Nav>
        <Link to='/'>
            <Button>Home</Button>
        </Link>
        
        <ThemeButton>Toggle</ThemeButton>
    </Nav>
);

export default Navbar;