import * as React from "react"
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import { useState } from 'react';
import PieChart from "../components/PieChart/PieChart.js"

import Layout from "../components/Layout/Layout.js"
import {graphql} from "gatsby"

import { Waypoint } from 'react-waypoint';

import { useSprings, config } from "react-spring";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "react-visibility-sensor";


const GenresByDecades = ({
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
  
  const [shownarr, setShownArr] = useState([true, false, false, false, false]);
  const springs = useSprings(
    shownarr.length,
    shownarr.map(shown => ({
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0px)" : "translateY(50px)",
      config: config.molasses
    }))
  );

    
  const numberPerformanceByGenre =[];
  const genres = []
  const genresByDecade = [[],[],[],[],[],[]]
  const numberPerformanceByGenreAndDecades = [[],[],[],[],[],[]]
  const years=[];
  const newData = [];

  const activeStyles={borderBottom: "3px solid #ef7c00", color:"#003D7C"};
  const [activeDecade, setActiveDecade] = React.useState("1960s");
  const [atTop, setAtTop] = React.useState(true)
  const atTopStyle = {position:"unset", zIndex:"1", backgroundColor:"#efefef"}
  const notAtTopStyle = {position:"fixed", zIndex:"1", top:"0",backgroundColor:"#efefef",transform: "translate(calc(50vw - 50%), calc(50vh - 50%))"}
  const alignCenter = { display: 'flex', alignItems: 'center' }

  chartData.nodes.map(event => 
    {  
      var currGenres = new Array()
      currGenres = event.Genres_concatenated.split(";")

      for (var i = 0; i < currGenres.length; i++) {
        var genre = currGenres[i].trim()
        if (!genres.includes(genre)) {
          genres.push(genre);
          numberPerformanceByGenre.push({
              name: genre,
              value: 1
          })
        } else {
            for(var data of numberPerformanceByGenre) {
                if(data.name === genre) {
                    data.value += 1
                }  
            }
        }
      }
      console.log(numberPerformanceByGenre)
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
        for (var i = 0; i < currGenres.length; i++) {
            var genre = currGenres[i]
            if (!genresByDecade[0].includes(genre)) {
              genresByDecade[0].push(genre);
              numberPerformanceByGenreAndDecades[0].push({
                  name: genre,
                  value: 1
              })
          } else {
              for(var data of numberPerformanceByGenreAndDecades[0]) {
                  if(data.name === genre) {
                      data.value += 1
                  }  
              }
          }
        }
      } else if (parseInt(year) >= 1970 && parseInt(year) < 1980) {
        for (var i = 0; i < currGenres.length; i++) {
           var genre = currGenres[i]
            if (!genresByDecade[1].includes(genre)) {
              genresByDecade[1].push(genre);
              numberPerformanceByGenreAndDecades[1].push({
                  name: genre,
                  value: 1
              })
          } else {
              for(var data of numberPerformanceByGenreAndDecades[1]) {
                  if(data.name === genre) {
                      data.value += 1
                  }  
              }
          }
        }
      } else if (parseInt(year) >= 1980 && parseInt(year) < 1990) {
        for (var i = 0; i < currGenres.length; i++) {
           var genre = currGenres[i]
            if (!genresByDecade[2].includes(genre)) {
              genresByDecade[2].push(genre);
              numberPerformanceByGenreAndDecades[2].push({
                  name: genre,
                  value: 1
              })
          } else {
              for(var data of numberPerformanceByGenreAndDecades[2]) {
                  if(data.name === genre) {
                      data.value += 1
                  }  
              }
          }
        }
      } else if (parseInt(year) >= 1990 && parseInt(year) < 2000) {
        for (var i = 0; i < currGenres.length; i++) {
           var genre = currGenres[i]
            if (!genresByDecade[3].includes(genre)) {
              genresByDecade[3].push(genre);
              numberPerformanceByGenreAndDecades[3].push({
                  name: genre,
                  value: 1
              })
          } else {
              for(var data of numberPerformanceByGenreAndDecades[3]) {
                  if(data.name === genre) {
                      data.value += 1
                  }  
              }
          }
        }
      } else if (parseInt(year) >= 2000 && parseInt(year) < 2010) {
        for (var i = 0; i < currGenres.length; i++) {
            var genre = currGenres[i]
            if (!genresByDecade[4].includes(genre)) {
              genresByDecade[4].push(genre);
              numberPerformanceByGenreAndDecades[4].push({
                  name: genre,
                  value: 1
              })
          } else {
              for(var data of numberPerformanceByGenreAndDecades[4]) {
                  if(data.name === genre) {
                      data.value += 1
                  }  
              }
          }
        }
      } else if (parseInt(year) >= 2010 && parseInt(year) < 2020) {
        for (var i = 0; i < currGenres.length; i++) {
            var genre = currGenres[i]
            if (!genresByDecade[5].includes(genre)) {
              genresByDecade[5].push(genre);
              numberPerformanceByGenreAndDecades[5].push({
                  name: genre,
                  value: 1
              })
          } else {
              for(var data of numberPerformanceByGenreAndDecades[5]) {
                  if(data.name === genre) {
                      data.value += 1
                  }  
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
           Genres By Decades
          </h1>
        </Jumbotron>


        <Container style={{position:"fixed", zIndex:"1", top:"300px", left:"50px", width:"100px"}}>
            <p style={activeDecade === "1960s" ? activeStyles : null}>1960-1970</p>
            <p style={activeDecade === "1970s" ? activeStyles : null}>1970-1980</p>
            <p style={activeDecade === "1980s" ? activeStyles : null}>1980-1990</p>
            <p style={activeDecade === "1990s" ? activeStyles : null}>1990-2000</p>
            <p style={activeDecade === "2000s" ? activeStyles : null}>2000-2010</p>
            <p style={activeDecade === "2010s" ? activeStyles : null}>2010-2020</p>
        </Container>
      <Container  style={atTop ? atTopStyle : notAtTopStyle}>
        {activeDecade === "1960s" &&  
              <Container>
              <Row>
                <Col>
                  <h3>What is Lorem Ipsum?</h3>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                  desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Col>
                <Col>
                  <PieChart data = {numberPerformanceByGenreAndDecades[0]} radius = {100} innerRadius={30} containerHeight={500} color={"#132d59"}/>
                </Col>
              </Row>
              </Container>
            }
            {activeDecade === "1970s" && 
              <Container>
              <Row>
              <Col>
                <PieChart data = {numberPerformanceByGenreAndDecades[1]} radius = {100} innerRadius={30} containerHeight={500} color={"#213970"}/>
              </Col>
              <Col>
              <h3>What is Lorem Ipsum?</h3>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                  desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Col>
            </Row>
            </Container>

            }
            {activeDecade === "1980s"  &&           
              <Container>
            <Row>
              <Col>
              <Col>
              <h3>What is Lorem Ipsum?</h3>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                  desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Col>
              </Col>
              <Col>
                <PieChart data = {numberPerformanceByGenreAndDecades[2]} radius = {100} innerRadius={30} containerHeight={500} color={"#5b0e2d"}/>
              </Col>
            </Row>
            </Container>

            }
            {activeDecade === "1990s" &&           
              <Container>
            <Row>

              <Col>
                <PieChart data = {numberPerformanceByGenreAndDecades[3]} radius = {100} innerRadius={30} containerHeight={500} color={"#132d59"}/>
              </Col>
              <Col>
              <h3>What is Lorem Ipsum?</h3>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                  desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Col>
            </Row>
            </Container>

            }
            {activeDecade === "2000s" &&           
              <Container>
            <Row>
              <Col>
              <h3>What is Lorem Ipsum?</h3>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                  desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Col>
              <Col>
                <PieChart data = {numberPerformanceByGenreAndDecades[4]} radius = {100} innerRadius={30} containerHeight={500} color={"#213970"}/>
              </Col>
            </Row>
            </Container>

            }
            {activeDecade === "2010s" &&           
              <Container>
            <Row>

              <Col>
                <PieChart data = {numberPerformanceByGenreAndDecades[5]} radius = {100} innerRadius={30} containerHeight={500} color={"#5b0e2d"}/>
              </Col>
              <Col>
              <h3>What is Lorem Ipsum?</h3>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                  desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Col>
            </Row>
            </Container>


            }
              

      </Container>


        <VisibilitySensor style={{height:"1000px"}}>
            {({ isVisible }) => (
              <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
                {({ opacity }) => (<Container style={{ opacity }}>

            <h1 style={{ justifyContent: "center", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
            <Waypoint
              onEnter={({ previousPosition, currentPosition, event }) => {if(currentPosition > previousPosition) {setActiveDecade("1960s")} }}
              onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("1970s");setAtTop(false)} else {setAtTop(true)}}}
            />
            </h1>

          </Container>)}

          </Spring>
            )}
          </VisibilitySensor>

          <VisibilitySensor partialVisibility>
            {({ isVisible }) => (
              <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
                {({ opacity }) => (<Container style={{ opacity }}>

            <h1 style={{ justifyContent: "center", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
            <Waypoint
              onEnter={({ previousPosition, currentPosition, event }) => {if(currentPosition > previousPosition) {setActiveDecade("1970s")} }}
              onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("1980s")} else {setActiveDecade("1960s")}}}
            />
            </h1>

            </Container>)}
          </Spring>
            )}
          </VisibilitySensor>

        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
              {({ opacity }) => (<Container style={{ opacity }}>

          <h1 style={{ justifyContent: "center", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
          <Waypoint
            onEnter={() => {setActiveDecade("1980s")}}
            onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("1990s")} else {setActiveDecade("1970s")}}}

          />
          </h1>


          </Container>)}

        </Spring>
          )}
        </VisibilitySensor>


        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
              {({ opacity }) => (<Container style={{ opacity }}> 

             <h1 style={{ justifyContent: "center", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
             <Waypoint
            onEnter={() => {setActiveDecade("1990s")}}
            onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("2000s")} else {setActiveDecade("1980s")}}}

          />        
          </h1>


          </Container>)}

        </Spring>
          )}
        </VisibilitySensor>

        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
              {({ opacity }) => (<Container style={{ opacity }}>     


          <h1 style={{ justifyContent: "center", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
          <Waypoint
            onEnter={() => {setActiveDecade("2000s")}}
            onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("2010s")} else {setActiveDecade("1990s")}}}

          />    
          </h1>

          </Container>)}

        </Spring>
          )}
        </VisibilitySensor>

        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
              {({ opacity }) => (<Container style={{ opacity }}>      

          <h1 style={{ justifyContent: "center", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
          <Waypoint
            onEnter={() => {setActiveDecade("2010s")}}
            onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("2020s")} else {setActiveDecade("2000s")}}}

          />   
          </h1>


          </Container>)}

        </Spring>
          )}
        </VisibilitySensor>



        ))
      </Layout>
    );
  };
  
export default GenresByDecades

export const data = graphql`
    query newChart2{
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


