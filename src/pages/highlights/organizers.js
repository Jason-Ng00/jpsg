import * as React from "react"
import { Container, Jumbotron } from 'react-bootstrap'
import BarGraph from "../../components/BarGraph/BarGraph.js"
import EventList from "../../components/EventList/EventList.js"

import Layout from "../../components/Layout/Layout.js"
import Seo from "../../components/seo"
import {graphql} from "gatsby"

import DropdownSelection from "../../components/DropdownSelection/DropdownSelection.js"

const Organizer = ({
    data: {
      chartData
    },
  }) => {
    var eventDetails = chartData.nodes
    var eventList = []
    const years=[];
    const newData = [];

    const [selectedOrganizer, setSelectedOrganizer] = React.useState("-- Select an Organizer --");
    const [selectedYear, setSelectedYear] = React.useState(null);
    
    const organizers = chartData.distinct
    const distinct_organizers = []
    organizers.map(organizer => {
        var curr_organizers = []
        curr_organizers = organizer.split(";")
        for (var i = 0; i < curr_organizers.length; i++) {
          var curr_organizer = curr_organizers[i].trim();

          if (!distinct_organizers.includes(curr_organizer)) {
            distinct_organizers.push(curr_organizer);
        }
      }
      return organizers
    }
    )

    if(selectedOrganizer === "-- Select an Organizer --") {
        eventDetails = chartData.nodes;
    } else {
        eventDetails = chartData.nodes.filter(event => event.Organizers_concatenated.includes(selectedOrganizer))
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
      <Seo title={"Visualize by Major Organizers"}/>
        <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
          Visualize by Major Organizers
          </h1>
        </Jumbotron>

        <Container>

        <DropdownSelection data = {distinct_organizers} handleClick = {setSelectedOrganizer} current={selectedOrganizer} default="-- Select an Organizer --"/>

        <BarGraph data={newData} title={"Number of Performance over time"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"} click={setSelectedYear}/>

        <EventList data={eventList} attribute={["Performance_Title","Genres_concatenated","Date","Time"]}></EventList>

        </Container>

      </Layout>
    );
  };
  
export default Organizer

export const data = graphql`
    query Organizer{
        chartData: allJpsgCsv {
          distinct(field: Organizers_concatenated)
          nodes {
            Date
            English_name_of_performing_troupes__performers_concatenated
            Genres_concatenated
            Performance_Title
            Time
            Organizers_concatenated
            Venue_concatenated
            Latitude
            Longtitude
          }
        }
    }
    `;



