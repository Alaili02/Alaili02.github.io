import { createSlice } from '@reduxjs/toolkit'

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

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        ...permanentTheme,
        ...darkModeTheme
    },
    reducers: {
        toggleTheme: (state) => {
            return (state.name === 'DARK_MODE')? 
            { ...permanentTheme, ...lightModeTheme }:
            { ...permanentTheme, ...darkModeTheme };
        },
        editCSS: (state, action) => {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value
            }
        }
    }
})
export const selectThemeName = (state) => state.theme.name;
export const selectThemeFontColor = (state) => state.theme.fontColor;
export const selectThemeTextShadowColor = (state) => state.theme.textShadowColor;
export const selectThemeMainAccent = (state) => state.theme.mainAccent;
export const selectThemeBackgroundColor = (state) => state.theme.backgroundColor;
export const { toggleTheme, editCSS } = themeSlice.actions;
export default themeSlice.reducer;