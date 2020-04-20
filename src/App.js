import React from 'react'
import styles from './App.module.css';
import {Cards, Chart, CountryPicker} from './components'
import {fetchData} from './api';
import coronaImage from './Images/image.png'
class App extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
             data:{},
             country:''
        }
    }
    
  

    async componentDidMount (){
        const fetchedData = await fetchData();

        this.setState({data:fetchedData})

        console.log("reponse",this.state.data)
    }

    handleCountryChange =  async (country) =>{
        const fetchedData = await fetchData(country);
        this.setState({
            country:country,
            data:fetchedData})
    }
    render(){
        const {data,country} = this.state
        return(
            <div className={styles.container}>
                <img src={coronaImage} className={styles.corona} alt='Covid-19'/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}
export default App;