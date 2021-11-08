import * as React from "react"
import { useState, useEffect } from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import { PureComponent } from 'react';
import BarGraph from "../../components/BarGraph/BarGraph.js"
import EventList from "../../components/EventList/EventList.js"

import Layout from "../../components/Layout/Layout.js"
import Seo from "../../components/seo"
import {graphql, useStaticQuery} from "gatsby"

import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import DropdownSelection from "../../components/DropdownSelection/DropdownSelection.js"


import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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

    const handleClick = ({key}) => {
        setSelectedOrganizer(key)
        if(key == "-- Select an Organizer --") {
            setSelectedYear(null)
        }
    }

    const menu = () => { 
        const organizers = chartData.distinct
        return(
        <Menu onClick={handleClick}>
          <Menu.Item key="-- Select an Organizer --">
              -- Select a Organizier --
          </Menu.Item>
          {organizers.map(organizer =>  {
              return(
            <Menu.Item key={organizer}>
              {organizer}
            </Menu.Item>
              )
          })
          }
    
        </Menu>
      );
    }
    
    if(selectedOrganizer == "-- Select an Organizer --") {
        eventDetails = chartData.nodes;
    } else {
        eventDetails = chartData.nodes.filter(event => event.Organizers_concatenated == selectedOrganizer)
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
        {/* <Dropdown overlay={menu} onChange={(value) => {alert(value)}} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {selectedOrganizer} <DownOutlined />
            </a>
        </Dropdown> */}
        <DropdownSelection data = {chartData.distinct} handleClick = {setSelectedOrganizer} current={selectedOrganizer} default="-- Select an Organizer --"/>

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



