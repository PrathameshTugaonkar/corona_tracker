//Class Based Component
import React from 'react';
import {Cards, Chart, CountryPicker} from './components'
import styles from './App.module.css';
import {fetchData} from './api/index';
import coranaimage from './image/coronaimage.jpg';
class App extends React.Component{
    state = {
        data:{},
        country:'',
    }
    async componentDidMount(){
        const fetchedData = await fetchData(); //await should be wrapped in async so componentDidMount has async
        this.setState({data:fetchedData});
    }
    handleCountryChange = async(country)=>{
        //fetch the data 
                const fetchedData = await fetchData(country);
                console.log(fetchedData);
                console.log(country);
        //set the state
         this.setState({data:fetchedData, country:country});
    }
    render(){
        const {data, country} = this.state;
        return(
            
            <div className={styles.container}>
                <img className= {styles.image} src={coranaimage}></img>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;
