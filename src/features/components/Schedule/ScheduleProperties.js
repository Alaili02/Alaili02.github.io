import React from 'react';
import { connect } from 'react-redux';
import { setScheduleProperties, addScheduleItem, selectProperties } from '../../../store/scheduleSlice.js';

import { GridHeader as Header, GridLabel as Label } from '../../PrimaryStyles.js'
import { StyledInput } from './ScheduleOperations.js';

const ScheduleProperties =  ({userInput, onSetScheduleProperties, onAddScheduleItem}) => {
    const HandleInputChange = e => {
        const {name, value} = e.target;
        if (name==='interval' && value <= 0) {
            return;
        }
        onSetScheduleProperties({
            name,
            value: parseFloat(value)
        })
        // singleInterval = value;
    }
    
    return (
        <>
            <Header>Properties</Header>
            <Label htmlFor='singleIntervalInput'>Time Interval</Label>
            <StyledInput 
                name='interval'
                type='number'
                id='singleIntervalInput' 
                defaultValue={userInput.interval} 
                step='0.25' 
                min='0.25' 
                max='3' 
                onChange={HandleInputChange}>
            </StyledInput>

            <Label htmlFor='scaleInput'>Scale</Label>
            <StyledInput 
                name='scale' 
                type='number'
                id='scaleInput'
                defaultValue={userInput.scale} 
                step='0.1' 
                min='1' 
                max='10' 
                onChange={HandleInputChange}>
            </StyledInput>

            <Label htmlFor='dayStartInput'>Start day at: </Label>
            <StyledInput 
                name='dayStart' 
                type='number'
                id='dayStartInput'
                defaultValue={userInput.dayStart}
                step='0.5' 
                min='0' 
                max='24' 
                onChange={HandleInputChange}>
            </StyledInput>

            <Label htmlFor='dayEndInput'>End day at: </Label>
            <StyledInput 
                name='dayEnd' 
                type='number'
                id='dayEndInput'
                defaultValue={userInput.dayEnd} 
                step='0.5' 
                min='0' 
                max='24' 
                onChange={HandleInputChange}>
            </StyledInput>
        </>
    );
}

const mapStateToProps = state => ({
    userInput: selectProperties(state)
});
const mapDispatchToProps = dispatch => ({
    onSetScheduleProperties: (obj) => dispatch(setScheduleProperties(obj)),
    onAddScheduleItem: (item) => dispatch(addScheduleItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleProperties);