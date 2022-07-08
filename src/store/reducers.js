import { 
    SET_SCHEDULE_PROPERTIES, 
    ADD_SCHEDULE_ITEM,
    REMOVE_SCHEDULE_ITEM, 
    TOGGLE_THEME } from './actions.js';

const permanentTheme = {
    navHeight: '6vh',
}
const darkModeTheme = {
    name: 'DARK_MODE',
    fontColor: "#DDDDDD",
    textShadowColor: "#111111",
    mainAccent: "#5555FF",
    backgroundColor: "#222222",
    scheduleBackgroundColor: '#222222',
}
const lightModeTheme = {
    name: 'LIGHT_MODE',
    fontColor: "#222222",
    textShadowColor: "#EEEEEE",
    mainAccent: "#FF5555",
    backgroundColor: "#DDDDDD",
    scheduleBackgroundColor: '#DDDDDD',
}

export const ThemeReducer = (state = { ...permanentTheme, ...darkModeTheme }, action) => {
    const {type, payload} = action;

    switch(type) {
        case TOGGLE_THEME: {
            return (state.name == 'DARK_MODE')? 
            { ...permanentTheme, ...lightModeTheme }:
            { ...permanentTheme, ...darkModeTheme };
        }
        default:
            return state;
    }
}

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
        scale: 5,
        dayStart: 8,
        dayEnd: 18,
    }
};
export const ScheduleReducer = (state=initialScheduleState, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case SET_SCHEDULE_PROPERTIES: {
            const {name, value} = payload;
            return {
                ...state,
                properties: {
                    ...state.properties,
                    [name]: value
                }
            };
        }
        case ADD_SCHEDULE_ITEM: {
            return {
                ...state,
                items: [
                    ...state.items,
                    payload
                ]
            }
        }
        case REMOVE_SCHEDULE_ITEM: {
            const items = state.items.filter((item) => payload !== item.id)
            return {
                ...state,
                items
            }
        }
        default:
            return state;
    }
}