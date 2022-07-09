import React from 'react';
import styled from 'styled-components';
import { MainContentWrapper } from '../features/PrimaryStyles.js';
import Schedule from '../features/components/Schedule/Schedule.js';
import ScheduleOperations from '../features/components/Schedule/ScheduleOperations.js';
import ScheduleItems from '../features/components/Schedule/ScheduleItems.js';

const ContentWrapper = styled(MainContentWrapper)`
    > h1 {
        padding: 10px;
        margin: 0;
        padding: 1vh 0;
        text-align: center;
    }
`;

const SomeWrapper = styled.div`
    display: grid;
    /* grid-template-columns: max-content max-content auto; */
    grid-template-columns: 20% 1fr;
    grid-template-areas: "items schedule" "itemsAdd schedule" "operations schedule";
    grid-auto-rows: min-content;
    align-items: flex-start;

    > * {
        margin: 10px;
        padding: 10px;

        -webkit-box-shadow: 0 0.005em 0.5em rgba(0,0,0,0.75);
        -moz-box-shadow: 0 0.005em 0.5em rgba(0,0,0,0.75);
        box-shadow: 0 0.005em 0.5em rgba(0,0,0,0.75);
    }
`;

const Schedulepage = () => (
    <ContentWrapper>
        <h1>Schedule Builder</h1>
        <SomeWrapper>
            <ScheduleItems />
            <ScheduleOperations />
            {/* <ScheduleItems /> */}
            {/* <ScheduleAddItem /> */}
            <Schedule />
        </SomeWrapper>
    </ContentWrapper>
);

export default Schedulepage;