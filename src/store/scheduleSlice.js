import { createSlice } from '@reduxjs/toolkit'

const initialScheduleState = {
    items: [
        {
            id: '1',
            name: 'Item 1',
            color: '#22ee22',
            content: [
                {
                    type: 'Lab',
                    day: 'M',
                    timeStart: '8.5',
                    timeEnd: '10'
                },
                {
                    type: 'Lecture',
                    day: 'T',
                    timeStart: '8.5',
                    timeEnd: '10'
                },
            ]
        },
        {
            id: '2',
            name: 'Item 2',
            color: '#eeee22',
            content: [
                {
                    type: 'Tutorial',
                    day: 'F',
                    timeStart: '8.5',
                    timeEnd: '10'
                },
                {
                    type: 'Blended',
                    day: 'U',
                    timeStart: '13',
                    timeEnd: '14'
                },
            ]
        }
    ],
    properties: {
        interval: 1,
        scale: 6,
        dayStart: 8,
        dayEnd: 18,
    }
};

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        ...initialScheduleState
    },
    reducers: {
        setScheduleProperties: (state, action) => {
            const {name, value} = action.payload;
            return {
                ...state,
                properties: {
                    ...state.properties,
                    [name]: value
                }
            }
        },
        addScheduleItem: (state, action) => {
            return {
                ...state,
                items: [
                    ...state.items,
                    action.payload
                ]
            }
        },
        removeScheduleItem: (state, action) => {
            const items = state.items.filter((item) => action.payload !== item.id)
            return {
                ...state,
                items
            }
        }
    }
});

export const selectItems = (state) => state.schedule.items;
export const selectProperties = (state) => state.schedule.properties;
export const { setScheduleProperties, addScheduleItem, removeScheduleItem } = scheduleSlice.actions;
export default scheduleSlice.reducer;