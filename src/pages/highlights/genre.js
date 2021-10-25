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


const Genre = ({
    data: {
      chartData
    },
  }) => {
    var eventDetails = chartData.nodes
    var eventList = []
    const years=[];
    const newData = [];

    const [selectedGenre, setSelectedGenre] = React.useState("-- Select a Genre --");
    const [selectedYear, setSelectedYear] = React.useState(null);

    const handleClick = ({key}) => {
        setSelectedGenre(key)
        if(key == "-- Select a Genre --") {
            setSelectedYear(null)
        }
    }
    const genres = chartData.distinct
    const distinct_genres = []
    genres.map(genre => {
        var currGenres = new Array()
        currGenres = genre.split(";")
        for (var i = 0; i < currGenres.length; i++) {
          var currGenre = currGenres[i]

          if (!distinct_genres.includes(currGenre)) {
            distinct_genres.push(currGenre);
        }
      }
    }
    )
    const menu = () => { 

        return(
        <Menu onClick={handleClick}>
          <Menu.Item key="-- Select a Genre --">
              -- Select a Genre --
          </Menu.Item>
          {distinct_genres.map(genre =>  {
              return(
            <Menu.Item key={genre}>
              {genre}
            </Menu.Item>
              )
          })
          }
    
        </Menu>
      );
    }
    
    if(selectedGenre == "-- Select a Genre --") {
        eventDetails = chartData.nodes;
    } else {
        eventDetails = chartData.nodes.filter(event => event.Genres_concatenated.includes(selectedGenre))
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
      <Seo title={"Visualize by Major Genres"}/>
        <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
          Visualize by Major Genres
          </h1>
  
        </Jumbotron>

        <Container>
        <Dropdown overlay={menu} onChange={(value) => {alert(value)}} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {selectedGenre} <DownOutlined />
            </a>
        </Dropdown>


        <DropdownSelection data = {distinct_genres} handleClick = {setSelectedGenre} current={selectedGenre} default="-- Select a Genre --"/>

        <BarGraph data={newData} title={"Number of Performance over time"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"} click={setSelectedYear}/>

        <EventList data={eventList} attribute={["Performance_Title","Genres_concatenated","Date","Time"]}></EventList>

        </Container>

      </Layout>
    );
  };
  
export default Genre

export const data = graphql`
    query Genre{
        chartData: allJpsgCsv {
          distinct(field: Genres_concatenated)
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
          two:group(field: Performance_types_concatenated) {
                fieldValue
                totalCount
                nodes {
                  Genres_concatenated
              }
          }
        }
    }
    `;



