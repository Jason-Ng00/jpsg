import * as React from "react"

import { Container, Jumbotron, Row, Col, Button} from "react-bootstrap"

import BarGraph from "../../components/BarGraph/BarGraph.js"
import EventList from "../../components/EventList/EventList.js"

import Layout from "../../components/Layout/Layout.js"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

import DropdownSelection from "../../components/DropdownSelection/DropdownSelection.js"

const Venue = ({ data: { chartData } }) => {
  var eventDetails = chartData.nodes
  var eventList = []
  const years = []
  const newData = []
  var distinct_venues = chartData.distinct

  const [selectedVenue, setSelectedVenue] = React.useState(
    "-- Select a Venue --"
  )
  const [selectedYear, setSelectedYear] = React.useState(null)

  if (selectedVenue === "-- Select a Venue --") {
    eventDetails = chartData.nodes
  } else {
    eventDetails = chartData.nodes.filter(
      event => event.Venue_concatenated === selectedVenue
    )
  }

  chartData.nodes.map(event => {
    if (selectedVenue === "-- Select a Venue --" && selectedYear && event.Date.slice(0, 4) === selectedYear) {
      eventList.push(event)
      var year = event.Date.slice(0, 4)
    if (!years.includes(year)) {
      years.push(year)
      newData.push({
        year: year,
        value: 1,
      })
    } else {
      for (var data of newData) {
        if (data.year === year) {
          data.value += 1
        }
      }
    }
    } else if (selectedVenue === "-- Select a Venue --" && !selectedYear) {
      eventList.push(event)
      var year = event.Date.slice(0, 4)
    if (!years.includes(year)) {
      years.push(year)
      newData.push({
        year: year,
        value: 1,
      })
    } else {
      for (var data of newData) {
        if (data.year === year) {
          data.value += 1
        }
      }
    }
    } else if (event.Venue_concatenated === selectedVenue && selectedYear && event.Date.slice(0, 4) === selectedYear) {
      eventList.push(event)
      var year = event.Date.slice(0, 4)
    if (!years.includes(year)) {
      years.push(year)
      newData.push({
        year: year,
        value: 1,
      })
    } else {
      for (var data of newData) {
        if (data.year === year) {
          data.value += 1
        }
      }
    }
    } else if (event.Venue_concatenated === selectedVenue && !selectedYear) {
      eventList.push(event)
      var year = event.Date.slice(0, 4)
    if (!years.includes(year)) {
      years.push(year)
      newData.push({
        year: year,
        value: 1,
      })
    } else {
      for (var data of newData) {
        if (data.year === year) {
          data.value += 1
        }
      }
    }
    } 

    
    return newData
  })

  var final_venues = []
  if (!selectedYear) {
    final_venues = distinct_venues
  } else {
    eventList.map(event => {
      var currVenue = event.Venue_concatenated
      if (!final_venues.includes(currVenue)) {
        final_venues.push(currVenue)
      }
      

    })
  }


  newData.sort(function (a, b) {
    var keyA = Number(a.year),
      keyB = Number(a.year)
    // Compare the 2 years
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })
  return (
    <Layout>
      <Seo title={"Visualize by Venues"} />
      <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
        <h1
          style={{
            justifyContent: "center",
            height: "100px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Visualize by Venues
        </h1>
      </Jumbotron>

      <Container>
      <Row>
      <Col sm={11} md={11}>
        <DropdownSelection
          data={final_venues}
          handleClick={setSelectedVenue}
          current={selectedVenue}
          default="-- Select a Venue --"
        />
      </Col>

      <Col sm={1} md={1}>
        <Button bsStyle="primary" onClick={() => {setSelectedVenue("-- Select a Venue --"); setSelectedYear(null)}}>Reset</Button>
        </Col>
        </Row>

        <BarGraph
          data={newData}
          title={"Number of Performance over time"}
          xaxis={"year"}
          yaxis={"value"}
          yaxisName={"Number of Performances"}
          click={setSelectedYear}
        />


        <EventList
          data={eventList}
          attribute={[
            "Performance_Title",
            "Venue_concatenated",
            "Genres_concatenated",
            "Date",
            "Time",
          ]}
        ></EventList>
      </Container>
    </Layout>
  )
}

export default Venue

export const data = graphql`
  query Venue {
    page: googleDocs(slug: { eq: "/highlights/visualize-by-venues" }) {
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
`
