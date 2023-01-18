import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        value: 0,
        grades: [],
        server: {
            url: '',
            id: '',
            secret: ''
        },
        musicLoader: false,
        topBanner: false,
        userData: '',
        appMusic: true,
        deviceToken: '',
        backgroundMusic: '',
        profile: '',
    },
    reducers: {

        setGrades: (state, action) => {
            state.grades = action.payload
        },
        setMusicLoading: (state, action) => {
            state.musicLoader = action.payload
        },
        setServer: (state, action) => {
            state.server = action.payload
        },
        setTopBanner: (state, action) => {
            state.topBanner = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setAppMusic: (state, action) => {
            state.appMusic = action.payload
        },
        setDeviceToken: (state, action) => {
            state.deviceToken = action.payload
        },
        setBackgroundMusic: (state, action) => {
            state.backgroundMusic = action.payload
        },
        setUserProfile: (state, action) => {
            state.profile = action.payload
        }


    }
})

export const { setGrades, setMusicLoading, setServer, setTopBanner, setUserData, setAppMusic, setDeviceToken, setBackgroundMusic, setUserProfile } = mainSlice.actions

export default mainSlice.reducer