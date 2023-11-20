
import {createSlice} from '@reduxjs/toolkit'

const windowSlice=createSlice({
    name:"auth",
    initialState:{
        isWindow:false,
    },

    reducers:{
       
        closeWindow(state){
            state.isWindow=false
        },

        openWindow(state){
            const newWindow=window.open('http://localhost:8000/auth/google',"_self")//,'_blank',"width=500,height=600"
            if(newWindow){
                state.isWindow=true
            }
        }

    }
})


export const windowActions=windowSlice.actions

export default windowSlice