import React, { Component } from "react"
import axios from "axios"
import apiUrl from "../apiConfig"
import Comment from "./Comment"

function GeneralChat(props) {
    return(
        <div>
            <h1> General Chat </h1>
            <Comment />
        </div>
    )} 


export default GeneralChat