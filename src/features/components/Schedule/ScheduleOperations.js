import React from 'react';
import styled from 'styled-components';

import ScheduleAddItem from './ScheduleAddItem.js';
import ScheduleProperties from './ScheduleProperties.js';

export const StyledInput = styled.input`
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

const ScheduleOperationsWrapper = styled.div`
    display: grid;
    grid-template-columns: [label-start] auto [label-end input-start] 12ch [input-end];
    align-items: center;
`;

const ScheduleOperations = () => {
    return(
        <>
        <ScheduleOperationsWrapper>
                <ScheduleProperties />
        </ScheduleOperationsWrapper>
        <ScheduleOperationsWrapper>
                <ScheduleAddItem />
        </ScheduleOperationsWrapper>
        </>
    );
}


export default ScheduleOperations;
