import React from 'react';
import Axios from 'axios';
import { response } from 'express';
class Convert extends React.Component {

    constructor() {
        super();
        this.state = {
            input:{}
        };
    }

    componentDidMount(){
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
        const apiKey = "b067b3b01460c91047ad00711366af60"; 
        Axios.get(apiUrl + "kollam" + `&appid=${apiKey}`).then(response=>{
            this.setState({input: response.data});
            
        })
    }

    render() {

        return (
            <div>
            </div>


        )
    }

}

export default Convert;
