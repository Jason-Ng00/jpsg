import * as React from "react"
import { Container, Row, Col, Jumbotron } from "react-bootstrap"
import PieChart from "../components/PieChart/PieChart.js"

import Layout from "../components/Layout/Layout.js"
import { graphql } from "gatsby"

import { Waypoint } from "react-waypoint"

import { Spring } from "react-spring/renderprops"
import VisibilitySensor from "react-visibility-sensor"
import { useSpring, animated } from "react-spring"

import bgImage1 from "../images/Genres by timeline/GENRES BY TIMELINE_1916 to 1945_takarazuka.jpeg"
import bgImage2 from "../images/Genres by timeline/GENRES BY TIMELINE_1946-1976_wikimedia_singapore river.jpeg"
import bgImage3 from "../images/Genres by timeline/GENRES BY TIMELINE_1977-1999_tworks_themorningstarproject002.jpeg"
import bgImage4 from "../images/Genres by timeline/GENRES BY TIMELINE_2000 till present_ninagawa macbeth.jpg"

const PerformancesByTimeline = ({
  data: {
    page: {
      name,
      cover,
      description,
      childMarkdownRemark: { html },
    },
    chartData,
  },
}) => {
  const numberPerformanceByGenre = []
  const genres = []
  const genresByDecade = [[], [], [], []]
  const numberPerformanceByGenreAndDecades = [[], [], [], []]
  const years = []
  const newData = []

  const activeStyles = { borderBottom: "3px solid #ef7c00", color: "#003D7C" }
  const [activeSegment, setActiveSegment] = React.useState(1)
  const [atTop, setAtTop] = React.useState(true)
  const atTopStyle = { position: "unset", zIndex: "1" }
  const notAtTopStyle = {
    position: "fixed",
    zIndex: "1",
    top: "0",
    transform: "translate(calc(50vw - 50%), calc(50vh - 50%))",
  }

  chartData.nodes.map(event => {
    var currGenres = []
    currGenres = event.Genres_concatenated.split(";")

    for (var i = 0; i < currGenres.length; i++) {
      var genre = currGenres[i].trim()
      if (!genres.includes(genre)) {
        genres.push(genre)
        numberPerformanceByGenre.push({
          name: genre,
          value: 1,
        })
      } else {
        for (var data of numberPerformanceByGenre) {
          if (data.name === genre) {
            data.value += 1
          }
        }
      }
    }
    var year = event.Date.slice(0, 4)
    if (!years.includes(year)) {
      years.push(year)
      newData.push({
        year: year,
        value: 1,
      })
    } else {
      for (data of newData) {
        if (data.year === year) {
          data.value += 1
        }
      }
    }

    if (parseInt(year) >= 1916 && parseInt(year) < 1946) {
      for (i = 0; i < currGenres.length; i++) {
        genre = currGenres[i]
        if (!genresByDecade[0].includes(genre)) {
          genresByDecade[0].push(genre)
          numberPerformanceByGenreAndDecades[0].push({
            name: genre,
            value: 1,
          })
        } else {
          for (data of numberPerformanceByGenreAndDecades[0]) {
            if (data.name === genre) {
              data.value += 1
            }
          }
        }
      }
    } else if (parseInt(year) >= 1946 && parseInt(year) < 1977) {
      for (i = 0; i < currGenres.length; i++) {
        genre = currGenres[i]
        if (!genresByDecade[1].includes(genre)) {
          genresByDecade[1].push(genre)
          numberPerformanceByGenreAndDecades[1].push({
            name: genre,
            value: 1,
          })
        } else {
          for (data of numberPerformanceByGenreAndDecades[1]) {
            if (data.name === genre) {
              data.value += 1
            }
          }
        }
      }
    } else if (parseInt(year) >= 1977 && parseInt(year) < 2000) {
      for (i = 0; i < currGenres.length; i++) {
        genre = currGenres[i]
        if (!genresByDecade[2].includes(genre)) {
          genresByDecade[2].push(genre)
          numberPerformanceByGenreAndDecades[2].push({
            name: genre,
            value: 1,
          })
        } else {
          for (data of numberPerformanceByGenreAndDecades[2]) {
            if (data.name === genre) {
              data.value += 1
            }
          }
        }
      }
    } else if (parseInt(year) >= 2000 && parseInt(year) < 2022) {
      for (i = 0; i < currGenres.length; i++) {
        genre = currGenres[i]
        if (!genresByDecade[3].includes(genre)) {
          genresByDecade[3].push(genre)
          numberPerformanceByGenreAndDecades[3].push({
            name: genre,
            value: 1,
          })
        } else {
          for (data of numberPerformanceByGenreAndDecades[3]) {
            if (data.name === genre) {
              data.value += 1
            }
          }
        }
      }
    }
    return numberPerformanceByGenre
  })
  return (
    <Layout>
      <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
        <h1
          style={{
            justifyContent: "center",
            height: "130px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Performances By Timeline
        </h1>
      </Jumbotron>
      <Container
        style={{
          position: "fixed",
          zIndex: "1",
          top: "300px",
          left: "50px",
          width: "100px",
        }}
      >
        <p style={activeSegment === 1 ? activeStyles : null}>
          Late 19 century to end of WWII
        </p>
        <p style={activeSegment === 2 ? activeStyles : null}>1946 to 1976 </p>
        <p style={activeSegment === 3 ? activeStyles : null}>1977 to 1999 </p>
        <p style={activeSegment === 4 ? activeStyles : null}>
          2000 till Present{" "}
        </p>
      </Container>
      <Container style={atTop ? atTopStyle : notAtTopStyle}>
        {activeSegment === 1 && (
          <Container>
            <Row>
              <Col
                xs={5}
                md={5}
                lg={5}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3>The late 19 century to end of WWII </h3>
                <p>
                  The very first visiting Japanese performers was an acrobatic
                  troupe called Masuda troupe that arrived in January 1896. They
                  put up advertisement in the papers and were here for several
                  days. Subsequently we also saw more similar kind of
                  performance troupes, such as the Kinoshita Circus, arriving.
                  One of the most interesting performances during the prewar era
                  was the visit of Takarazuka, they dropped by Singapore in
                  October 1938 and again in January 1939, on their way to and
                  back from Europe. As expected of war time situation, there
                  wasn’t a lot of performances in this time period.{" "}
                </p>
              </Col>
              <Col xs={7} md={7} lg={7}>
                <PieChart
                  data={numberPerformanceByGenreAndDecades[0]}
                  radius={100}
                  innerRadius={30}
                  containerHeight={500}
                  color={"#132d59"}
                />
              </Col>
              <Col></Col>
            </Row>
          </Container>
        )}
        {activeSegment === 2 && (
          <Container>
            <Row>
              <Col xs={7} md={7} lg={7}>
                <PieChart
                  data={numberPerformanceByGenreAndDecades[1]}
                  radius={100}
                  innerRadius={30}
                  containerHeight={500}
                  color={"#213970"}
                />
              </Col>
              <Col
                xs={5}
                md={5}
                lg={5}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3>
                  Immediate postwar to the announcement of the Fukuda Doctrine
                  in 1977{" "}
                </h3>
                <p>
                  After the war several important institutions that contributed
                  to the promotion of theatrical performances, both government
                  and non-profit, were formed. These include the Singapore
                  National Theatre Trust (1960); the Japanese Cultural Society,
                  Singapore(1963); the Agency of Cultural Affairs (1968).
                </p>
                <p>
                  Visiting performers from Japan was not very active yet, but we
                  saw several charity shows, especially in the early fifties and
                  sixties such as this 1968 show at the National Theatre by the
                  Takarazuka Revue, with profit went to the National Theatre
                  Trust. There were a variety of performances including the
                  Kinoshita Circus and the Tokyo Philharmonic Orchestra,
                  although the numbers are not high.
                </p>
              </Col>
            </Row>
          </Container>
        )}
        {activeSegment === 3 && (
          <Container>
            <Row>
              <Col
                xs={5}
                md={5}
                lg={5}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3>1977 through 1999 </h3>
                <p>
                  One important factor in cultural exchanges amongst countries
                  is often the foreign policy. The Japan Foundation was
                  established in 1972, then the Fukuda Doctrine which detailed
                  the Japanese foreign policies towards Asean countries was
                  announced in 1977. We can see that the number of visiting
                  Japanese performances after 1977 has increased, and so were
                  the kind of genre. More Japan-related official institutions
                  were formed in the 70s through the 90s, including the
                  establishment of the Department of Japanese Studies in 1981,
                  and the Japan Creative Centre in 2009, which expanded the
                  scope of visiting Japanese performances as can be seen here.{" "}
                </p>
              </Col>

              <Col xs={7} md={7} lg={7}>
                <PieChart
                  data={numberPerformanceByGenreAndDecades[2]}
                  radius={100}
                  innerRadius={30}
                  containerHeight={500}
                  color={"#5b0e2d"}
                />
              </Col>
            </Row>
          </Container>
        )}
        {activeSegment === 4 && (
          <Container>
            <Row>
              <Col xs={7} md={7} lg={7}>
                <PieChart
                  data={numberPerformanceByGenreAndDecades[3]}
                  radius={100}
                  innerRadius={30}
                  containerHeight={500}
                  color={"#132d59"}
                />
              </Col>
              <Col
                xs={5}
                md={5}
                lg={5}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3>2000 till Present</h3>
                <p>
                  The twenty-first century saw several important miles stones in
                  the scene of Japan-Singapore cultural exchange. 2015 was the
                  50th year anniversary of formal diplomatic relationship, and
                  then March 2019 the global pandemic hit, brought along a
                  heretofore unfathomable impact on theatrical performances. In
                  the happier days of 2015 and 2016, we saw many performances
                  from Japan visiting Singapore. But from 2019 March onwards,
                  with boarder closure and many other safety restrictions,
                  physical performance came to a sudden halt, as can be seen
                  here.{" "}
                </p>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
      <VisibilitySensor>
        {({ isVisible }) => (
          <Spring
            delay={100}
            from={{ opacity: 0 }}
            to={{ opacity: isVisible ? 0.6 : 0 }}
          >
            {({ opacity }) => (
              <Container style={{ opacity }}>
                <h1
                  style={{
                    justifyContent: "center",
                    height: "800px",
                    display: "flex",
                    alignItems: "center",
                    color: "#808080",
                  }}
                >
                  <Waypoint
                    onEnter={({ previousPosition, currentPosition, event }) => {
                      if (currentPosition > previousPosition) {
                        setActiveSegment(1)
                        setAtTop(true)
                      }
                    }}
                    onLeave={({ previousPosition, currentPosition, event }) => {
                      if (currentPosition === "above") {
                        setActiveSegment(2)
                        setAtTop(false)
                      } else {
                        setAtTop(true)
                      }
                    }}
                  />
                </h1>
              </Container>
            )}
          </Spring>
        )}
      </VisibilitySensor>
      <VisibilitySensor>
        {({ isVisible }) => (
          <Spring
            delay={100}
            from={{ opacity: 0 }}
            to={{ height: isVisible ? 1 : 100, opacity: isVisible ? 0.6 : 0 }}
          >
            {({ opacity }) => (
              <Container style={{ opacity }}>
                <h1
                  style={{
                    justifyContent: "center",
                    height: "800px",
                    display: "flex",
                    alignItems: "center",
                    color: "#808080",
                  }}
                >
                  <Waypoint
                    onEnter={({ previousPosition, currentPosition, event }) => {
                      if (currentPosition > previousPosition) {
                        setActiveSegment(2)
                      }
                    }}
                    onLeave={({ previousPosition, currentPosition, event }) => {
                      if (currentPosition === "above") {
                        setActiveSegment(3)
                      } else {
                        setActiveSegment(1)
                        setAtTop(true)
                      }
                    }}
                  />
                </h1>
              </Container>
            )}
          </Spring>
        )}
      </VisibilitySensor>
      <VisibilitySensor>
        {({ isVisible }) => (
          <Spring
            delay={100}
            from={{ opacity: 0 }}
            to={{ opacity: isVisible ? 0.6 : 0 }}
          >
            {({ opacity }) => (
              <Container style={{ opacity }}>
                <h1
                  style={{
                    justifyContent: "center",
                    height: "800px",
                    display: "flex",
                    alignItems: "center",
                    color: "#808080",
                  }}
                >
                  <Waypoint
                    onEnter={() => {
                      setActiveSegment(3)
                    }}
                    onLeave={({ previousPosition, currentPosition, event }) => {
                      if (currentPosition === "above") {
                        setActiveSegment(4)
                      } else {
                        setActiveSegment(2)
                      }
                    }}
                  />
                </h1>
              </Container>
            )}
          </Spring>
        )}
      </VisibilitySensor>
      <VisibilitySensor>
        {({ isVisible }) => (
          <Spring delay={100} to={{ opacity: isVisible ? 0.6 : 0 }}>
            {({ opacity }) => (
              <Container style={{ opacity }}>
                <h1
                  style={{
                    justifyContent: "center",
                    height: "800px",
                    display: "flex",
                    alignItems: "center",
                    color: "#808080",
                  }}
                >
                  <Waypoint
                    onEnter={() => {
                      setActiveSegment(4)
                    }}
                    onLeave={({ previousPosition, currentPosition, event }) => {
                      if (currentPosition === "above") {
                        setActiveSegment(0)
                      } else {
                        setActiveSegment(3)
                      }
                    }}
                  />
                </h1>
              </Container>
            )}
          </Spring>
        )}
      </VisibilitySensor>
      ))
    </Layout>
  )
}

export default PerformancesByTimeline

export const data = graphql`
  query performancesByTimeline {
    page: googleDocs(slug: { eq: "/performance-records" }) {
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
      two: group(field: Performance_types_concatenated) {
        fieldValue
        totalCount
        nodes {
          Genres_concatenated
        }
      }
    }
  }
`
