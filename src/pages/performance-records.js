import * as React from "react"
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import { useState, useEffect, PureComponent } from 'react';
import BarGraph from "../components/BarGraph/BarGraph.js"
import EventList from "../components/EventList/EventList.js"

import Layout from "../components/Layout/Layout.js"
import Seo from "../components/seo"
import {graphql, useStaticQuery} from "gatsby"
import {MDXRenderer} from "gatsby-plugin-mdx"
import ReactPaginate from 'react-paginate';
import data11 from '../components/EventList/mockdata.json';


import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Map, Marker } from "pigeon-maps"
import * as styles from './performance-records.scss'

const Page2 = ({
    data: {
      page: {
        name,
        cover,
        description,
        childMarkdownRemark: { html },
      },
      chartData
    },
  }) => {
    const eventDetails = chartData.nodes;
    const eventList = [];
    const mapData = []
    const pageTitle = name.split("_").pop();
    const years=[];
    const newData = [];
    const [selectedYear, setSelectedYear] = React.useState(null);
    const [selectedNode, setSelectedeNode] = React.useState(null);
    
    const [selectedTime, setSelectedTime] = React.useState(null);
    
    useEffect(() => {},[selectedTime, selectedNode])

    const handleClickMap = (node) => {
        if (selectedNode === node && selectedTime === node.Time) {
          setSelectedTime(null)
          setSelectedeNode(null)
        } else {
          setSelectedeNode(node)
          setSelectedTime(node.Time)
        }
    }

    if (selectedNode && selectedTime) {
      eventDetails.map(event => 
        {   if (event == selectedNode && event.Time == selectedTime) {
              eventList.push(event)
            }
            if (selectedYear && event.Date.slice(0,4) === selectedYear) {
              mapData.push(event)

            } else if(!selectedYear) {
                mapData.push(event)
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
    } else {
      eventDetails.map(event => 
        {   if (selectedYear && event.Date.slice(0,4) === selectedYear) {
              eventList.push(event)
              mapData.push(event)

            } else if(!selectedYear) {
                eventList.push(event)
                mapData.push(event)
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
    }


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
        <Seo title={pageTitle}/>

        <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
            Japanese Performances in Singapore, 1965-2015
          </h1>
  
        </Jumbotron>
        <Container>
          <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
        <Container>

        <BarGraph data={newData} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"} click={setSelectedYear}/>
        <Row>
        <Col>
        <Map className={styles.map} height={500} defaultCenter={[1.3521, 103.8198]} defaultZoom={11}>

        {/* <Marker width={50} anchor={[parseFloat(eventList[6].Latitude), parseFloat(eventList[6].Longtitude)]} />  */}
        {/* {alert(JSON.stringify(eventList[6].Latitude))} */}
        {mapData.map(node => {
          const lat = node.Latitude ? parseFloat(node.Latitude) : null
          const long = node.Longtitude ? parseFloat(node.Longtitude) : null

          return (
            <Marker width={50} anchor={[lat, long]} onClick={() => {handleClickMap(node)} }/> 
          );
        })}

        </Map>
        </Col>
        <Col>
        <EventList className={styles.eventlist} data={eventList} attribute={["Performance_Title","Genres_concatenated","Time"]}></EventList>
        </Col>
        </Row>



            
        </Container>

      </Layout>
    );
  };
  
export default Page2

export const data = graphql`
    query PerformanceRecords{
        page: googleDocs(slug: {eq: "/performance-records"}) {
          name
          description
          cover {
            alt
            title
            image {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
              }
            }
          }
          childMarkdownRemark {
            html
          } 
        }

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

