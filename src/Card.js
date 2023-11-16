import React, { Fragment } from 'react';
import Axios from 'axios';
class Card extends React.Component {

    constructor() {
        super();
        this.state = {
            city: '',
            textContent:'',
            input: {},
            error: false,
            showWeather: false,
            fadeIn:false
        }
    }

    getCity = (e) => {
        this.setState({ textContent: e.target.value }, () => {
            console.log(this.state.textContent);
        });
    }


    search = () => {
        this.setState({city:this.state.textContent},()=>{
            const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
            const apiKey = "b067b3b01460c91047ad00711366af60";
    
            if (this.state.city.trim !== '') {
                
                Axios.get(apiUrl + this.state.city + `&appid=${apiKey}`).then(response => {
                    this.setState({ input: response.data, error: false,fadeIn:true}, () => {
                        console.log(this.state.input);
                    });
    
    
                })
                    .catch(error => {
                        console.log("Error fetching data: ", error);
                        this.setState({ input: {}, error: true,fadeIn:false})
                    })
            }
            else {
                this.setState({ input: {}, error: true,fadeIn:false})
            }
        });




    };



    getWeatherIconSrc = (weatherCondition) => {
        switch (weatherCondition) {
          case 'Clouds':
            return 'images/clouds.png';
          case 'Clear':
            return 'images/clear.png';
          case 'Rain':
            return 'images/rain.png';
          case 'Drizzle':
            return 'images/drizzle.png';
          case 'Mist':
            return 'images/mist.png';
            case 'snow':
                return 'images/snow.png';
          default:
            return 'images/clear.png';
        }
      };


    




    render() {
        return (
            <div className={`card ${this.state.fadeIn? "slide-down":""}`}>
                <div className="search">
                    <input type="text" placeholder="Enter city name" autoFocus onBlur={this.getCity} />
                    <button onClick={this.search}><img src="images/search.png" /></button>
                </div>


                <div>
        {!this.state.error ? (
            <Fragment>
                          {this.state.fadeIn &&(
                            <div className={`weather-datails ${this.state.fadeIn? "fade-in":""}`}>
                                {
                                    <Fragment>
                                        <img src={this.getWeatherIconSrc(this.state.input.weather[0].main)} alt="Weather Icon"  className="weather-icon"/>
        
                                        <div className="temp">{Math.round(this.state.input.main.temp)}°c</div>
                                        <div className="city">{this.state.city}</div>
                                        <div className="weather-details">
                                            <div className="col">
                                                <img src="images/humidity.png" />
                                                <div>
                                                    <p className="humidity">{this.state.input.main.humidity}%</p>
                                                    <p>Humidity</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <img src="images/wind.png" />
                                                <div>
                                                    <p className="wind">{this.state.input.wind.speed}Km/h</p>
                                                    <p>Wind speed</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                }
                            </div>
                            
        
                        )}
            </Fragment>
            
        ) : (
            <Fragment>
            {this.state.error ? <div className="error">Invalid city name!</div> : ""}
            </Fragment>
        )}
      </div>



                
                
                




            </div>


        )
    }

}

export default Card;
