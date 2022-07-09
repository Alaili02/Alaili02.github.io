import React from 'react';
import styled from 'styled-components';
import { Button } from '../../PrimaryStyles.js'

const Container = styled.div`
    margin: 2px 0;
    grid-column: span 2;
    display: flex;
    flex-flow: row nowrap;
    align-content: center;
    justify-content: space-between;
`;

const DayButton = styled(Button)`
    flex: 1;
    max-width: 2vw;
    box-sizing: content-box;
    height: 1.5rem;
    padding: 0px;
    margin: 1px;


    ${props => {

        if (props.isSelected(props.value))
            return (
                'background-color: ' + props.theme.mainAccent + ';'+
                'border-color: ' + props.theme.fontColor + ';'+
                'color: ' + props.theme.fontColor+';'
                );
        else if (props.active)
            return (
                'background-color: ' + props.theme.mainAccent + ';'+
                'border-color: ' + props.theme.mainAccent + ';'+
                'color: ' + props.theme.backgroundColor + ';'
                );
        else
            return (
                'background-color: ' + props.theme.backgroundColor + ';'+
                'color: ' + props.theme.mainAccent + ';'
            );
    }}
`;

const DaySelector = ({active, setActive, selectedDay, setSelectedDay}) => {
    const ToggleActive = e => {
        setSelectedDay(e.target.value);
        setActive({
            ...active,
            [e.target.value]: true
            // [e.target.value]: !active[e.target.value]
        })
    }

    const isSelected = value => (selectedDay === value);

    return (
        <Container>
            <DayButton value='M' active={active.M} onClick={ToggleActive} isSelected={isSelected}>M</DayButton>
            <DayButton value='T' active={active.T} onClick={ToggleActive} isSelected={isSelected}>T</DayButton>
            <DayButton value='W' active={active.W} onClick={ToggleActive} isSelected={isSelected}>W</DayButton>
            <DayButton value='R' active={active.R} onClick={ToggleActive} isSelected={isSelected}>R</DayButton>
            <DayButton value='F' active={active.F} onClick={ToggleActive} isSelected={isSelected}>F</DayButton>
            <DayButton value='S' active={active.S} onClick={ToggleActive} isSelected={isSelected}>S</DayButton>
            <DayButton value='U' active={active.U} onClick={ToggleActive} isSelected={isSelected}>U</DayButton>
        </Container>
    );
}

export default DaySelector;