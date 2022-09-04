 import React from 'react'
 import "./HomeScreen.css";
import Nav from '../Nav';
import Banner from '../Banner';
import requests from '../Requests';
import Row from '../Row';
 
 function HomeScreen() {
     return (
         <div className="homeScreen">
             <Nav/>
             <Banner/>
             <Row title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetflixOriginals} isLargeRow={true}/>
              <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} isLargeRow={false}/>
               <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} isLargeRow={false}/>
               <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} isLargeRow={false} />
         </div>
     )
 }
 
 export default HomeScreen
 