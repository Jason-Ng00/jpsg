import * as React from "react"

import { Container, Jumbotron } from 'react-bootstrap'

import BarGraph from "../../components/BarGraph/BarGraph.js"
import EventList from "../../components/EventList/EventList.js"

import Layout from "../../components/Layout/Layout.js"
import Seo from "../../components/seo"
import {graphql} from "gatsby"

import DropdownSelection from "../../components/DropdownSelection/DropdownSelection.js"



const Venue = ({
    data: {
      chartData
    },
  }) => {
    var eventDetails = chartData.nodes
    var eventList = []
    const years=[];
    const newData = [];

    const [selectedVenue, setSelectedVenue] = React.useState("-- Select a Venue --");
    const [selectedYear, setSelectedYear] = React.useState(null);
    
    if(selectedVenue === "-- Select a Venue --") {
        eventDetails = chartData.nodes;
    } else {
        eventDetails = chartData.nodes.filter(event => event.Venue_concatenated === selectedVenue)
    }

    eventDetails.map(event => 
        {   if (selectedYear && event.Date.slice(0,4) === selectedYear) {
                eventList.push(event)
            } else if(!selectedYear) {
                eventList.push(event)
            }

           var year = event.Date.slice(0,4);
           if (!years.includes(year)) {
               years.push(year);
               newData.push({
                   year: year,
                   value: 1
               })
           } else {
               for(var data of newData) {
                   if(data.year === year) {
                       data.value += 1
                   }  
               }
           }
           return newData
        }
    )

    newData.sort(function(a, b) {
      var keyA = Number(a.year),
        keyB = Number(a.year);
      // Compare the 2 years
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    return (
      <Layout>
      <Seo title={"Visualize by Major Venues"}/>
        <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
          Visualize by Major Venues
          </h1>
  
        </Jumbotron>

        <Container>

        <DropdownSelection data = {chartData.distinct} handleClick = {setSelectedVenue} current={selectedVenue} default="-- Select a Venue --"/>

        <BarGraph data={newData} title={"Number of Performance over time"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"} click={setSelectedYear}/>

        <EventList data={eventList} attribute={["Performance_Title","Genres_concatenated","Date","Time"]}></EventList>

        </Container>

      </Layout>
    );
  };
  
export default Venue

export const data = graphql`
    query Venue{
        chartData: allJpsgCsv {
          distinct(field: Venue_concatenated)
          nodes {
            Date
            English_name_of_performing_troupes__performers_concatenated
            Genres_concatenated
            Performance_Title
            Time
            Venue_concatenated
            Latitude
            Longtitude
          }
        }
    }
    `;



