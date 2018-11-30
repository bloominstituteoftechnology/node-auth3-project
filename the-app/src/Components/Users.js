import React, { Component } from "react";
import axios from "axios";

export default class Users extends Component{
    constructor(props){
        super(props);
        this.state={
            loggedIn=false,
            user=[]
        }
    }
    render(){
        return(
            <div>
                {this.state.user.map(user=>{
                    return <h1>{user.username}</h1>
                })}
            </div>
        )
    }
}