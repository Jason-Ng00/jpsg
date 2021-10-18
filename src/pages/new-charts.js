import * as React from "react"
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import { useState, useEffect, PureComponent } from 'react';
import PieChart from "../components/PieChart/PieChart.js"
import BarGraph from "../components/BarGraph/BarGraph.js"

import Layout from "../components/Layout/Layout.js"
import Seo from "../components/seo"
import {graphql, useStaticQuery} from "gatsby"

import { Waypoint } from 'react-waypoint';
import { useInView, InView } from 'react-intersection-observer';



const NewChart = ({
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
  

      
  const numberPerformanceByGenre =[];
  const genres = []
  const genresByDecade = [[],[],[],[],[],[]]
  const numberPerformanceByGenreAndDecades = [[],[],[],[],[],[]]
  const years=[];
  const newData = [];

  const activeStyles={borderBottom: "3px solid #ef7c00", color:"#003D7C"};
  const [activeDecade, setActiveDecade] = React.useState(null);

  chartData.nodes.map(event => 
    {  
      const currGenre = event.Genres_concatenated
      if (!genres.includes(currGenre)) {
          genres.push(currGenre);
          numberPerformanceByGenre.push({
              name: currGenre,
              value: 1
          })
      } else {
          for(var data of numberPerformanceByGenre) {
              if(data.name === currGenre) {
                  data.value += 1
              }  
          }
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


      if (parseInt(year) >= 1960 && parseInt(year) < 1970) {
        if (!genresByDecade[0].includes(currGenre)) {
            genresByDecade[0].push(currGenre);
            numberPerformanceByGenreAndDecades[0].push({
                name: currGenre,
                value: 1
            })
        } else {
            for(var data of numberPerformanceByGenreAndDecades[0]) {
                if(data.name === currGenre) {
                    data.value += 1
                }  
            }
        }
      } else if (parseInt(year) >= 1970 && parseInt(year) < 1980) {
        if (!genresByDecade[1].includes(currGenre)) {
            genresByDecade[1].push(currGenre);
            numberPerformanceByGenreAndDecades[1].push({
                name: currGenre,
                value: 1
            })
        } else {
            for(var data of numberPerformanceByGenreAndDecades[1]) {
                if(data.name === currGenre) {
                    data.value += 1
                }  
            }
        }
      } else if (parseInt(year) >= 1980 && parseInt(year) < 1990) {
        if (!genresByDecade[2].includes(currGenre)) {
            genresByDecade[2].push(currGenre);
            numberPerformanceByGenreAndDecades[2].push({
                name: currGenre,
                value: 1
            })
        } else {
            for(var data of numberPerformanceByGenreAndDecades[2]) {
                if(data.name === currGenre) {
                    data.value += 1
                }  
            }
        }
      } else if (parseInt(year) >= 1990 && parseInt(year) < 2000) {
        if (!genresByDecade[3].includes(currGenre)) {
            genresByDecade[3].push(currGenre);
            numberPerformanceByGenreAndDecades[3].push({
                name: currGenre,
                value: 1
            })
        } else {
            for(var data of numberPerformanceByGenreAndDecades[3]) {
                if(data.name === currGenre) {
                    data.value += 1
                }  
            }
        }
      } else if (parseInt(year) >= 2000 && parseInt(year) < 2010) {
        if (!genresByDecade[4].includes(currGenre)) {
            genresByDecade[4].push(currGenre);
            numberPerformanceByGenreAndDecades[4].push({
                name: currGenre,
                value: 1
            })
        } else {
            for(var data of numberPerformanceByGenreAndDecades[4]) {
                if(data.name === currGenre) {
                    data.value += 1
                }  
            }
        }
      } else if (parseInt(year) >= 2010 && parseInt(year) < 2020) {
        if (!genresByDecade[5].includes(currGenre)) {
            genresByDecade[5].push(currGenre);
            numberPerformanceByGenreAndDecades[5].push({
                name: currGenre,
                value: 1
            })
        } else {
            for(var data of numberPerformanceByGenreAndDecades[5]) {
                if(data.name === currGenre) {
                    data.value += 1
                }  
            }
        }
      }
      return numberPerformanceByGenre
    }
  )

    return (
      <Layout>


        <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
           New Visualization
          </h1>


        </Jumbotron>
        <InView>
    {({ inView, ref, entry }) => (
      <div ref={ref}>
        <h2>{`Header inside viewport ${inView}.`}</h2>
      </div>
    )}
  </InView>
        {/* <Waypoint
        onEnter={}
        onLeave={}
      > */}
        <Container>
            <PieChart data = {numberPerformanceByGenre}/>
        </Container>
        <Container style={{position:"fixed", zIndex:"1", top:"100px", left:"50px", width:"100px"}}>
            <p style={activeDecade == "1960s" ? activeStyles : null}>1960-1970</p>
            <p style={activeDecade == "1970s" ? activeStyles : null}>1970-1980</p>
            <p style={activeDecade == "1980s" ? activeStyles : null}>1980-1990</p>
            <p style={activeDecade == "1990s" ? activeStyles : null}>1990-2000</p>
            <p style={activeDecade == "2000s" ? activeStyles : null}>2000-2010</p>
            <p style={activeDecade == "2010s" ? activeStyles : null}>2010-2020</p>
        </Container>

        
        
        <Waypoint
        onEnter={() => setActiveDecade("1960s")}
      />
        <Container>
          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
           1960-1970
          </h1>
          <Row>
            <Col>
              <BarGraph data={newData.filter(data => parseInt(data.year) >= 1960 && parseInt(data.year) < 1970)} color={"#f4b41a"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/>
            </Col>
            <Col>
              <PieChart data = {numberPerformanceByGenreAndDecades[0]} radius = {100} containerHeight={300} color={"#132d59"}/>
            </Col>
          </Row>
        </Container>


        <Waypoint
        onEnter={() => setActiveDecade("1970s")}
      />
        <Container>
          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
           1970-1980
          </h1>
          <Row>
            <Col>
              <BarGraph data={newData.filter(data => parseInt(data.year) >= 1970 && parseInt(data.year) < 1980)} color={"#2210070"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/>
            </Col>
            <Col>
              <PieChart data = {numberPerformanceByGenreAndDecades[1]} radius = {100} containerHeight={300} color={"#213970"}/>
            </Col>
          </Row>
        </Container>
        

        <Waypoint
        onEnter={() => setActiveDecade("1980s")}
      />
        <Container>
          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
           1980-1990
          </h1>
          <Row>
            <Col>
              <BarGraph data={newData.filter(data => parseInt(data.year) >= 1980 && parseInt(data.year) < 1990)} color={"#ffa781"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/>
            </Col>
            <Col>
              <PieChart data = {numberPerformanceByGenreAndDecades[2]} radius = {100} containerHeight={300} color={"#5b0e2d"}/>
            </Col>
          </Row>
        </Container>


        <Waypoint
        onEnter={() => setActiveDecade("1990s")}
      />
        <Container>
          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
           1990-2000
          </h1>
          <Row>
            <Col>
              <BarGraph data={newData.filter(data => parseInt(data.year) >= 1990 && parseInt(data.year) < 2000)} color={"#f4b41a"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/>
            </Col>
            <Col>
              <PieChart data = {numberPerformanceByGenreAndDecades[3]} radius = {100} containerHeight={300} color={"#132d59"}/>
            </Col>
          </Row>
        </Container>


        <Waypoint
        onEnter={() => setActiveDecade("2000s")}
      />
        <Container>
          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
           2000-2010
          </h1>
          <Row>
            <Col>
              <BarGraph data={newData.filter(data => parseInt(data.year) >= 2000 && parseInt(data.year) < 2010)} color={"#2210070"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/>
            </Col>
            <Col>
              <PieChart data = {numberPerformanceByGenreAndDecades[4]} radius = {100} containerHeight={300} color={"#213970"}/>
            </Col>
          </Row>
        </Container>


        <Waypoint
        onEnter={() => setActiveDecade("2010s")}
      />
        <Container>
          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
           2010-2020
          </h1>
          <Row>
            <Col>
              <BarGraph data={newData.filter(data => parseInt(data.year) >= 2010 && parseInt(data.year) < 2020)} color={"#f4b41a"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/>
            </Col>
            <Col>
              <PieChart data = {numberPerformanceByGenreAndDecades[5]} radius = {100} containerHeight={300} color={"#5b0e2d"}/>
            </Col>
          </Row>
        </Container>

        {/* </Waypoint> */}
      </Layout>
    );
  };
  
export default NewChart

export const data = graphql`
    query newChart{
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


