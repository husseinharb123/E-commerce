import React, { useEffect, useState } from 'react'
import Footer from '../../main components/Footer/Footer'
import Header from '../../main components/Header/Header'
import { Link, Outlet, useParams } from 'react-router-dom'
import HeaderProfile from '../components/HeaderProfile/HeaderProfile'
import NavSections from '../components/NavSections/NavSections'
import axios from 'axios'

export default function StorePageLayout() {

    const storeid  = useParams().id
    const [data, setData] = useState({});





  useEffect(()=>{

    const endpoint = '/store/visit';

    // Create a payload object with the storeid
    const payload = {
      storeid: storeid
    };
    
    // Make the HTTP POST request using Axios
    axios.post(endpoint, payload)
      .then(response => {
        // Handle successful response
        console.log(response.data.message); // Access the message from the response
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });



  },[storeid])







    useEffect(() => {

















        const fetchData = async () => {
          try {
            const response = await axios.get('/store-settings', {
              params: { storeid: storeid }
            });
    
            const data = response.data    
            setData(data)
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchData();
      }, []);

    return (
        <>

            <Header  />
            <HeaderProfile data={data}/>
            <NavSections data = {data} />

            <div className='section-component'>
            <Outlet data={data}/>

            </div>

            <Footer />

        </>
    )
}
