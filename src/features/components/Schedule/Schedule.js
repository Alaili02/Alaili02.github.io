import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import { selectItems, selectProperties } from '../../../store/scheduleSlice.js';

const ScheduleWrapper = styled.div`
    background-color: ${props => props.theme.backgroundColor};
    display: grid;
    grid-template-columns: [time-intervals-start] max-content [time-intervals-end items-start] repeat(7, auto) [items-end];
    grid-template-rows: 
        [header-start] max-content 
        [header-end items-start] 
        /* repeat(${props => props.rows}, auto) [items-end]; */
        repeat(${props => props.rows}, ${props => props.scale*props.rowLength}vh) [items-end];

    /* grid-gap: 3px; */
    text-align: center;

    grid-area: schedule;
`;

const Item = styled.div`
    font-size: 1rem;
    padding: 0.25rem;
    grid-column: ${props => props.col};
    grid-column-start: ${props => props.colStart};
    grid-column-end: ${props => props.colEnd};

    grid-row: ${props => props.row};
    grid-row-start: ${props => props.rowStart};
    grid-row-end: ${props => props.rowEnd};
    position: relative;
`;
const DayItem = styled(Item)`
    font-weight: bolder;
    font-size: larger;
`;
const AddedItem = styled(Item)`
    z-index: 1;

    /* background-color: ${props => props.theme.backgroundColor}; */
    background-color: ${props => props.backgroundColor};

    -webkit-box-shadow: 0 0.005em 0.5em rgba(0,0,0,0.5);
    -moz-box-shadow: 0 0.005em 0.5em rgba(0,0,0,0.5);
    box-shadow: 0 0.005em 0.5em rgba(0,0,0,0.5);
    border: solid 1px ${props => props.theme.backgroundColor};

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
`;

const ItemText = styled.p`
    margin: 0;
    padding: 0;
    ${props => {
        if (props.theme.name === 'DARK_MODE')
            return 'text-shadow: 1px 1px 2px '+props.theme.textShadowColor+';';
    }}
`;

const SeperatorItem = styled(Item)`
    z-index: 0;

    border-top: ${props => (props.index === 1)? "2px solid "+props.theme.mainAccent:"none"};
    border-bottom: 1px inset ${props => props.theme.mainAccent};
`;

export const ParseTime = (rawTime) => {
    const hours = Math.floor(rawTime);
    const minutes = (hours !== rawTime)? (rawTime - hours)*60 : 0;

    const HH = (hours < 10)? `0${hours}`: `${hours}`;
    const MM = (minutes < 10)? `0${minutes}`: `${minutes}`;
    const time = `${HH}:${MM}`;
    return time;
}

export const GetColFromDay = (day) => {
    let col;
    switch(day) {
        case 'M':
            col = '2 / 3';
            break;
        case 'T':
            col = '3 / 4';
            break;
        case 'W':
            col = '4 / 5';
            break;
        case 'R':
            col = '5 / 6';
            break;
        case 'F':
            col = '6 / 7';
            break;
        case 'S':
            col = '7 / 8';
            break;
        case 'U':
            col = '8 / 9';
            break;
        default:
            col = '1 / 2';
    }
    return col;
}

export const GetDayFromLetter = (letter) => {
    switch(letter) {
        case 'M':
            return 'Monday';
        case 'T':
            return 'Tuesday';
        case 'W':
            return 'Wednesday';
        case 'R':
            return 'Thursday';
        case 'F':
            return 'Friday';
        case 'S':
            return 'Saturday';
        case 'U':
            return 'Sunday';
        default:
            return '-';
    }
}

const Schedule = ({scheduleProperties, scheduleItems}) => {
    const {interval: singleInterval, scale, dayStart, dayEnd} = scheduleProperties;
    let dayLength = (dayEnd - dayStart);
    let rowLength = 15/60;

    const TimeIntervals = () => {
        const timeIntervals = [];
        for(let i = 1; i <= dayLength/singleInterval; i++) {

            const rawStart = dayStart + (i-1)*singleInterval;
            const rawEnd = dayStart + i*singleInterval;

            timeIntervals.push({
                index: i,
                start: ParseTime(rawStart),
                end: ParseTime(rawEnd),
                row: `${i + 1} / ${i + 2}`,
                rowStart: `${(i-1)*(singleInterval/rowLength)+1+1}`,
                rowEnd: `${i*(singleInterval/rowLength)+1+1}`
            })
        }
        return timeIntervals;
    }
    const DaysHeader = () => {
        return (
            <> 
                <DayItem col='2 / 3' rowStart='header-start' rowEnd='header-end'>Monday</DayItem>
                <DayItem col='3 / 4' rowStart='header-start' rowEnd='header-end'>Tuesday</DayItem>
                <DayItem col='4 / 5' rowStart='header-start' rowEnd='header-end'>Wednesday</DayItem>
                <DayItem col='5 / 6' rowStart='header-start' rowEnd='header-end'>Thursday</DayItem>
                <DayItem col='6 / 7' rowStart='header-start' rowEnd='header-end'>Friday</DayItem>
                <DayItem col='7 / 8' rowStart='header-start' rowEnd='header-end'>Saturday</DayItem>
                <DayItem col='8 / 9' rowStart='header-start' rowEnd='header-end'>Sunday</DayItem>
            </>
        );
    }
    const CreateItem = item => {
        const {name, id, content, color} = item;
        return (
            <React.Fragment key={name+id}>
                {content.map(contentItem => {
                    let col = GetColFromDay(contentItem.day);
                    let rowLineStart = (contentItem.timeStart - dayStart)/rowLength + 1 + 1;
                    let rowLineEnd = (contentItem.timeEnd - dayStart)/rowLength + 1 + 1;
                    let row = `${rowLineStart} / ${rowLineEnd}`;
                    
                    return (
                        <AddedItem
                            title={`${ParseTime(contentItem.timeStart)} - ${ParseTime(contentItem.timeEnd)}`}
                            col={col}
                            rowStart={rowLineStart}
                            rowEnd={rowLineEnd}
                            backgroundColor={color}
                            key={`${id} - ${row} - ${col}`}>
                                <ItemText>{name}</ItemText>
                                <ItemText>{contentItem.type}</ItemText>
                        </AddedItem>
                    );
                })}
            </React.Fragment>
        );
    };

    return (
        <>
        <ScheduleWrapper rows={dayLength/rowLength} rowLength={rowLength} scale={scale}>
                {scheduleItems.map((item) => CreateItem(item))}

                {DaysHeader()}
                {TimeIntervals()
                    .map(item => 
                    <SeperatorItem 
                        index={item.index}
                        colStart='time-intervals-start'
                        colEnd='time-intervals-end'
                        rowStart={item.rowStart}
                        rowEnd={item.rowEnd}
                        key={item.row}>
                        {`${item.start} - ${item.end}`}
                    </SeperatorItem>)}

                {TimeIntervals()
                    .map(item => 
                    <SeperatorItem 
                        index={item.index}
                        colStart='items-start'
                        colEnd='items-end'
                        rowStart={item.rowStart}
                        rowEnd={item.rowEnd}
                        key={item.row + 'sep'}>
                    </SeperatorItem>)}
        </ScheduleWrapper>
        </>
    );
}

const mapStateToProps = state => ({
    scheduleProperties: selectProperties(state),
    scheduleItems: selectItems(state)
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);