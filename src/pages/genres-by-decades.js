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
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useSprings, animated, config } from "react-spring";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "react-visibility-sensor";
import { motion, useAnimation } from "framer-motion";
import * as styles from './styles.module.css'

const NewChart2 = ({
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
  const [activeDecade, setActiveDecade] = React.useState(null);
  const [currDisplay, setcurrDisplay] = React.useState(0);

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


        {/* <InView>
    {({ inView, ref, entry }) => (
      <div ref={ref}>
        <h2>{`Header inside viewport ${inView}.`}</h2>
      </div>
    )}
  </InView> */}
        {/* <Waypoint
        onEnter={}
        onLeave={}
      > */}

      
        {/* <Container >
            <PieChart data = {numberPerformanceByGenre}/>
        </Container> */}
        <Container style={{position:"fixed", zIndex:"1", top:"300px", left:"50px", width:"100px"}}>
            <p style={activeDecade == "1960s" ? activeStyles : null}>1960-1970</p>
            <p style={activeDecade == "1970s" ? activeStyles : null}>1970-1980</p>
            <p style={activeDecade == "1980s" ? activeStyles : null}>1980-1990</p>
            <p style={activeDecade == "1990s" ? activeStyles : null}>1990-2000</p>
            <p style={activeDecade == "2000s" ? activeStyles : null}>2000-2010</p>
            <p style={activeDecade == "2010s" ? activeStyles : null}>2010-2020</p>
        </Container>
      <Container  style={{position:"fixed", zIndex:"1", top:"200px", left:"20%", width:"60%"}}>
        {currDisplay == 1 &&  
              <Container>
              <Row>
                <Col>
                  {/* <BarGraph data={newData.filter(data => parseInt(data.year) >= 1960 && parseInt(data.year) < 1970)} color={"#f4b41a"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/> */}
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
            {currDisplay == 2 && 
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
                {/* <BarGraph data={newData.filter(data => parseInt(data.year) >= 1970 && parseInt(data.year) < 1980)} color={"#2210070"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/> */}
              </Col>
            </Row>
            </Container>

            }
            {currDisplay == 3  &&           
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
                {/* <BarGraph data={newData.filter(data => parseInt(data.year) >= 1970 && parseInt(data.year) < 1980)} color={"#2210070"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/> */}
              </Col>
                {/* <BarGraph data={newData.filter(data => parseInt(data.year) >= 1980 && parseInt(data.year) < 1990)} color={"#ffa781"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/> */}
              </Col>
              <Col>
                <PieChart data = {numberPerformanceByGenreAndDecades[2]} radius = {100} innerRadius={30} containerHeight={500} color={"#5b0e2d"}/>
              </Col>
            </Row>
            </Container>

            }
            {currDisplay == 4 &&           
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
                {/* <BarGraph data={newData.filter(data => parseInt(data.year) >= 1990 && parseInt(data.year) < 2000)} color={"#f4b41a"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/> */}
              </Col>
            </Row>
            </Container>

            }
            {currDisplay==5 &&           
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
                {/* <BarGraph data={newData.filter(data => parseInt(data.year) >= 2000 && parseInt(data.year) < 2010)} color={"#2210070"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/> */}
              </Col>
              <Col>
                <PieChart data = {numberPerformanceByGenreAndDecades[4]} radius = {100} innerRadius={30} containerHeight={500} color={"#213970"}/>
              </Col>
            </Row>
            </Container>

            }
            {currDisplay == 6 &&           
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
                {/* <BarGraph data={newData.filter(data => parseInt(data.year) >= 2010 && parseInt(data.year) < 2020)} color={"#f4b41a"} title={"Number of Performances"} xaxis={"year"} yaxis={"value"} yaxisName={"Number of Performances"}/> */}
              </Col>
            </Row>
            </Container>


            }
              

      </Container>
      {/* <Parallax pages={5} style={{height:"1000px"}}>
        <ParallaxLayer offset={0} speed={0.5} style={{ ...alignCenter, justifyContent: 'center' }}>
          <p className={styles.scrollText}>Scroll down</p>
        </ParallaxLayer>


        <ParallaxLayer sticky={{ start: 1, end: 5 }} style={{ ...alignCenter, justifyContent: 'center' }}>
            
        </ParallaxLayer>
        </Parallax> */}

        <VisibilitySensor partialVisibility style={{height:"1000px"}}>
            {({ isVisible }) => (
              <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
                {({ opacity }) => (<Container style={{ opacity }}>

            <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
            <Waypoint
              onEnter={({ previousPosition, currentPosition, event }) => {if(currentPosition > previousPosition) {setActiveDecade("1960s"); setcurrDisplay(1)} }}
              onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("1970s"); setcurrDisplay(2)} else {setActiveDecade(null); setcurrDisplay(null)}}}
            />
            {/* 1960-1970 */}
            </h1>

          </Container>)}

          </Spring>
            )}
          </VisibilitySensor>

          <VisibilitySensor partialVisibility>
            {({ isVisible }) => (
              <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
                {({ opacity }) => (<Container style={{ opacity }}>

            <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
            <Waypoint
              onEnter={({ previousPosition, currentPosition, event }) => {if(currentPosition > previousPosition) {setActiveDecade("1970s"); setcurrDisplay(2)} }}
              onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("1980s"); setcurrDisplay(2)} else {setActiveDecade("1960s"); setcurrDisplay(1)}}}
            />
            {/* 1970-1980 */}
            </h1>

            </Container>)}
          </Spring>
            )}
          </VisibilitySensor>

        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
              {({ opacity }) => (<Container style={{ opacity }}>

          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
          <Waypoint
            onEnter={() => {setActiveDecade("1980s"); setcurrDisplay(3)}}
            onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("1990s"); setcurrDisplay(3)} else {setActiveDecade("1970s"); setcurrDisplay(2)}}}

          />
           {/* 1980-1990 */}
          </h1>


          </Container>)}

        </Spring>
          )}
        </VisibilitySensor>


        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
              {({ opacity }) => (<Container style={{ opacity }}> 

             <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
             <Waypoint
            onEnter={() => {setActiveDecade("1990s"); setcurrDisplay(4)}}
            onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("2000s"); setcurrDisplay(4)} else {setActiveDecade("1980s"); setcurrDisplay(3)}}}

          />        
           {/* 1990-2000 */}
          </h1>


          </Container>)}

        </Spring>
          )}
        </VisibilitySensor>

        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
              {({ opacity }) => (<Container style={{ opacity }}>     


          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
          <Waypoint
            onEnter={() => {setActiveDecade("2000s"); setcurrDisplay(5)}}
            onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("2010s"); setcurrDisplay(6)} else {setActiveDecade("1990s"); setcurrDisplay(4)}}}

          />    
           {/* 2000-2010 */}
          </h1>

          </Container>)}

        </Spring>
          )}
        </VisibilitySensor>

        <VisibilitySensor partialVisibility>
          {({ isVisible }) => (
            <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
              {({ opacity }) => (<Container style={{ opacity }}>      

          <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"1000px", display:"flex", alignItems:"center",color:"#808080"}}>
          <Waypoint
            onEnter={() => {setActiveDecade("2010s"); setcurrDisplay(6)}}
            onLeave={({ previousPosition, currentPosition, event }) => {if(currentPosition == "above") {setActiveDecade("2020s"); setcurrDisplay(7)} else {setActiveDecade("2000s"); setcurrDisplay(5)}}}

          />   
           {/* 2010-2020 */}
          </h1>


          </Container>)}

        </Spring>
          )}
        </VisibilitySensor>



        ))
      </Layout>
    );
  };
  
export default NewChart2

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


