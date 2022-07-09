import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { addScheduleItem } from '../../../store/scheduleSlice.js';
import { Button, GridHeader as Header, GridLabel as Label } from '../../PrimaryStyles.js'
import { GetDayFromLetter } from './Schedule.js';
import DaySelector from './DaySelector.js';

const StyledInput = styled.input`
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.fontColor};
    grid-column: input-start / input-end;

    outline: none;
    border: none;
    border-bottom: 1px solid ${props => props.theme.fontColor};

    &[type='color']{
        padding: 0;
        width: 100%;
    }
`;

const StyledSelect = styled.select`
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.fontColor};
    grid-column: input-start / input-end;

    outline: none;
    border: none;
    border-bottom: 1px solid ${props => props.theme.fontColor};
`;

const AddButton = styled(Button)`
    margin-top: 2%;
    grid-column: label-start / input-end;
`;

const ContentProperties = ({itemContents, setItemContents, index, day}) => {
    const HandleInputChange = e => {
        const {name: inputName, value: inputValue} = e.target;
        setItemContents(() => {
            const notMyItem = itemContents.filter(item => item !== myItem);
            return(
                [
                    ...notMyItem,
                    {
                        day: day,
                        index: index,
                        ...myItem,
                        [inputName]: inputValue
                    }
                ]
            );
        })
    };
    const myItem = itemContents.find(item => item.day === day && item.index === index) ||
        {
            day: day,
            index: index,
            type: 'Select',
            timeStart: '',
            timeEnd: ''
        };
    return (
        <>
            <Label htmlFor='typeSelect'>Type: </Label>
            <StyledSelect 
                name='type' 
                id='typeSelect' 
                onChange={HandleInputChange} 
                value={myItem.type || 'Select'}>
                    <option value='Select' disabled>Select</option>
                    <option value='Lecture'>Lecture</option>
                    <option value='Lab'>Lab</option>
                    <option value='Tutorial'>Tutorial</option>
                    <option value='Blended'>Blended</option>
            </StyledSelect>

            <Label htmlFor='newDayStartInput'>Starts at:</Label>
            <StyledInput 
                name='timeStart' 
                id='newDayStartInput'
                type='time'
                step='900'
                value={myItem.timeStart || ''}
                onChange={HandleInputChange}>
            </StyledInput>

            <Label htmlFor='newDayEndInput'>Ends at:</Label>
            <StyledInput 
                name='timeEnd' 
                id='newDayEndInput'
                type='time'
                step='900'
                value={myItem.timeEnd || ''}
                onChange={HandleInputChange}>
            </StyledInput>
        </>
    );
}

const ScheduleAddItem = ({onAddScheduleItem}) => {
    const [selectedDay, setSelectedDay] = useState('');
    const [daysToAdd, setDaysToAdd] = useState({
        M: false,
        T: false,
        W: false,
        R: false,
        F: false,
        S: false,
        U: false,
    });
   
    const [itemProperties, setItemProperties] = useState({
        name: '',
        color: '#000000',
        count: {
            M: 0,
            T: 0,
            W: 0,
            R: 0,
            F: 0,
            S: 0,
            U: 0
        }
    });
    const [itemContents, setItemContents] = useState([]);

    const HandleSubItemPropertiesChange = e => {
        const {name: inputName, value: inputValue} = e.target;
        if (inputName==='count')
            setItemProperties({
                ...itemProperties,
                count: {
                    ...itemProperties.count,
                    [selectedDay]: parseFloat(inputValue)
                }
            })
        else
            setItemProperties({
                ...itemProperties,
                [inputName]: inputValue
            })
    }

    const onClickAddScheduleItem = () => {
        // const dayStartTime = stagedItem.newDayStart.split(':');
        // if (!isValidTime(dayStartTime[0], dayStartTime[1])) return; //add invalid input message

        // const dayEndTime = stagedItem.newDayEnd.split(':');
        // if (!isValidTime(dayEndTime[0], dayEndTime[1])) return; //add invalid input message

        const parsedItemContents = itemContents.map(item => {
            let dayStartTime = item.timeStart.split(':');    
            let dayEndTime = item.timeEnd.split(':');
    
            return ({
                day: item.day,
                type: item.type,
                timeStart: `${parseInt(dayStartTime[0]) + dayStartTime[1]/60}`,
                timeEnd: `${parseInt(dayEndTime[0]) + dayEndTime[1]/60}`
            });
        });

        onAddScheduleItem({
            id: uuidv4(),
            name: itemProperties.name,
            color: itemProperties.color,
            content: parsedItemContents
        });
    }

    return (
        <>
            <Header>New Item</Header>
            <Label htmlFor='nameInput'>Name: </Label>
            <StyledInput
                type='text'
                name='name'
                id='nameInput'
                value={itemProperties.name || ''}
                onChange={HandleSubItemPropertiesChange}>
            </StyledInput>

            <Label htmlFor='newColorInput'>Color: </Label>
            <StyledInput
                type='color'
                name='color'
                id='newColorInput'
                value={itemProperties.color || '#000000'}
                onChange={HandleSubItemPropertiesChange}>
            </StyledInput>

            <DaySelector 
                active={daysToAdd} 
                setActive={setDaysToAdd} 
                selectedDay={selectedDay} 
                setSelectedDay={setSelectedDay}/>

            <Label htmlFor='SelectedDayView'>Selected Day: </Label>
            <StyledInput
                id='SelectedDayView'
                type='text'
                value={GetDayFromLetter(selectedDay) || ''}
                disabled/>

            <Label htmlFor='countInput'>Content Count:</Label>
            <StyledInput
                name='count'
                id='countInput'
                type='number'
                min='0'
                value={itemProperties.count[selectedDay] || 0}
                onChange={HandleSubItemPropertiesChange}/>

            {/* {(selectedItem.count)? Array(selectedItem.count).fill(<ContentProperties key={'te'}/>):null} */}
            {(itemProperties.count[selectedDay])? 
                [...Array(itemProperties.count[selectedDay]).keys()].map(key => 
                    <ContentProperties 
                    key={key+'TypeTimeInput'} 
                    day={selectedDay}
                    index={key}
                    itemContents={itemContents}
                    setItemContents={setItemContents}/>)
                :null
            }
            {/* {(selectedItem.count)? Array.from({length: selectedItem.count}, (v, i) => <ContentProperties key={i+'TypeTimeInput'}/>):null} */}
            
            <AddButton onClick={onClickAddScheduleItem}>Add to Schedule</AddButton>
        </>
    );
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onAddScheduleItem: item => dispatch(addScheduleItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleAddItem);