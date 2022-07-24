import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.error = false
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.loading = false
            state.error = true
        },
        logout:(state)=>{
            state.loading = false
            state.error = false
            state.currentUser = null
        },
        subscribe: (state, action) => {       
            if(!state.currentUser.subscribedUsers.includes(action.payload)){
                state.currentUser.subscribedUsers.push(action.payload)
            }
        },
        unsubscribe: (state,action)=>{
            if(state.currentUser.subscribedUsers.includes(action.payload))
            {
                state.currentUser.subscribedUsers = state.currentUser.subscribedUsers.filter((sUser)=>(
                    sUser !== action.payload
                ))
            }
        }
        
    }
})


export const { loginStart,loginSuccess,loginFailure,logout,subscribe,unsubscribe } = userSlice.actions
export default userSlice.reducer