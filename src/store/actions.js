export const DO_NOTHING = 'DO_NOTHING';
export const doNothing = () => ({
    type: DO_NOTHING,
});

export const TOGGLE_THEME = 'TOGGLE_THEME';
export const toggleTheme = () => ({
    type: TOGGLE_THEME,
});

export const SET_SCHEDULE_PROPERTIES = 'SET_SCHEDULE_PROPERTIES'
export const setScheduleProperties = (obj) => ({
    type: SET_SCHEDULE_PROPERTIES,
    payload: obj
});

export const ADD_SCHEDULE_ITEM = 'ADD_SCHEDULE_ITEM';
export const addScheduleItem = (item) => ({
    type: ADD_SCHEDULE_ITEM,
    payload: item
});

export const REMOVE_SCHEDULE_ITEM = 'REMOVE_SCHEDULE_ITEM';
export const removeScheduleItem = (id) => ({
    type: REMOVE_SCHEDULE_ITEM,
    payload: id
})