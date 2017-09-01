import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from '@/components/chart'
import GoogleMap from '@/components/googlemaps'

class WeatherList extends Component { 
    renderWeather(cityData) {
        const tempWeather = weather => {
            return weather.main.temp;
        }
        const pressureWeather = weather => {
            return weather.main.pressure;
        }
        const humidityWeather = weather => {
            return weather.main.humidity;
        }
            const name = cityData.city.name;
            const temps = cityData.list.map(tempWeather);
            const pressure = cityData.list.map(pressureWeather);
            const humidity = cityData.list.map(humidityWeather);
            const {lon, lat} = cityData.city.coord;

            return (
                <tr key = {name}>
                    <td>
                        <GoogleMap lat = { lat } lon = {lon}/></td>
                    <td>
                        <Chart data = { temps } color = "orange" units = "(K)"/>
                    </td>
                    <td>
                        <Chart data = { pressure } color = "blue" units = "hPa"/>
                    </td>
                    <td>
                        <Chart data = { humidity } color = "red" units = "%"/>
                    </td>
                </tr>
                
            )
        }
    render() {
        return(
            <div className="w-container">
                <table className="table table-hover">
                <thead className="thead-default">
                <tr>
                    <th width= "25%">City</th>
                    <th width= "25%">Temperature (K)</th>
                    <th width= "25%">Pressure (hPa)</th>
                    <th width= "25%">Humidity (%)</th>
                </tr>
                </thead>
                <tbody>
                    { this.props.newWeather.map(this.renderWeather.bind(this)) }
                </tbody>
            </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        newWeather: state.weather
    }
}

export default connect(mapStateToProps)(WeatherList);