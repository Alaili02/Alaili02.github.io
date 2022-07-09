import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { MainContentWrapper } from '../features/PrimaryStyles.js';
import { editCSS } from '../store/themeSlice'; 

export const StyledInput = styled.input`
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.fontColor};

    outline: none;
    border: none;
    border-bottom: 1px solid ${props => props.theme.fontColor};

    &[type='color']{
        padding: 0;
        width: 100%;
    }
`;

const Themepage = ({onEditCSS}) => {

    const HandleInputChange = e => {
        const {name, value} = e.target;

        onEditCSS({
            name,
            value: value
        })
    }

    return (
    <MainContentWrapper>
        <p>Font color:</p>
        <StyledInput 
                name='backgroundColor'
                type='color'
                id='singleIntervalInput' 
                defaultValue='0'
                step='0.25' 
                min='0.25' 
                max='3'
                onChange={HandleInputChange}>
            </StyledInput>
    </MainContentWrapper>
    );
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onEditCSS: (obj) => dispatch(editCSS(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Themepage);