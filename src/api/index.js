import axios from 'axios';

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) =>{
    let changeableUrl = url;
    if(country){
        changeableUrl = `${url}/countries/${country}`
    }
  try {
      // first type to destructure data===== 

      const {data :{confirmed,recovered,deaths,lastUpdate}} = await axios.get(changeableUrl);
      return {confirmed,recovered,deaths,lastUpdate}

    //  second type to destructure data 
    //   const {data} =  await axios.get(url);
    //       const modiFiedData = {
    //           confirmed:data.confirmed,
    //           revovered:data.revovered,
    //           deaths:data.deaths,
    //           lastUpdate:data.lastUpdate
    //       }
    //       return modiFiedData
      
  }
  catch(error){

  };
}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`);
        
        const modifiedData = data.map((dailyData)=>({
            confirmed:dailyData.confirmed.total,
            deaths:dailyData.deaths.total,
            date:dailyData.reportDate
        }))
        return modifiedData
        
    }catch(error){

    }
}

export const fetchCountries = async () =>{
    try{
        const {data:{countries}} = await axios.get(`${url}/countries`);
        const countryData = countries.map((country)=>country.name)
        return countryData
    }catch(error){
        console.log(error);
        
    }
}