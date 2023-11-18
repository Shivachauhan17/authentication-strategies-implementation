import React from "react";
import { Link } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { windowActions } from "../store/window-slice";
import { useDispatch } from "react-redux";

const Home=()=>{
    const dispatch=useDispatch()

    return(
        <div>
            <p>login with google  </p>
            <GoogleButton onClick={()=>dispatch(windowActions.openWindow())}/>
        </div>
    )
}

export default Home;