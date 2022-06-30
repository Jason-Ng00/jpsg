import * as React from "react"
import { Container, Jumbotron, Button } from "react-bootstrap"
import BarGraph from "../../components/BarGraph/BarGraph.js"
import EventList from "../../components/EventList/EventList.js"

import Layout from "../../components/Layout/Layout.js"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

import DropdownSelection from "../../components/DropdownSelection/DropdownSelection.js"

const Genre = ({ data: { chartData } }) => {
  var eventDetails = chartData.nodes
  var eventList = []
  const years = []
  const newData = []

  const [selectedGenre, setSelectedGenre] = React.useState(
    "-- Select a Genre --"
  )
  const [selectedYear, setSelectedYear] = React.useState(null)


  const genres = chartData.distinct
  const distinct_genres = []
  genres.map(genre => {
    var currGenres = []
    currGenres = genre.split(";")
    for (var i = 0; i < currGenres.length; i++) {
      var currGenre = currGenres[i].trim()

      if (!distinct_genres.includes(currGenre)) {
        distinct_genres.push(currGenre)
      }
    }
    return genre
  })

  if (selectedGenre === "-- Select a Genre --") {
    eventDetails = chartData.nodes
  } else {
    eventDetails = chartData.nodes.filter(event =>
      event.Genres_concatenated.includes(selectedGenre)
    )
  }
  


  chartData.nodes.map(event => {
    if (selectedGenre === "-- Select a Genre --" && selectedYear && event.Date.slice(0, 4) === selectedYear) {
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
    } else if (selectedGenre === "-- Select a Genre --" && !selectedYear) {
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
    } else if (event.Genres_concatenated.includes(selectedGenre) && selectedYear && event.Date.slice(0, 4) === selectedYear) {
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
    } else if (event.Genres_concatenated.includes(selectedGenre) && !selectedYear) {
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

  var final_genres = []
  if (!selectedYear) {
    final_genres = distinct_genres
  } else {
    eventList.map(event => {
      var currGenres = []
      currGenres = event.Genres_concatenated.split(";")
      for (var i = 0; i < currGenres.length; i++) {
        var currGenre = currGenres[i].trim()
  
        if (!final_genres.includes(currGenre)) {
          final_genres.push(currGenre)
        }
      }
      return event
    })
  }

  newData.sort(function (a, b) {
    var keyA = Number(a.year),
      keyB = Number(b.year)
    // Compare the 2 years
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })
  return (
    <Layout>
    {/* {alert(JSON.stringify(final_genres))} */}
      <Seo title={"Visualize by Major Genres"} />
      <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
        <h1
          style={{
            justifyContent: "center",
            height: "100px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Visualize by Major Genres
        </h1>
      </Jumbotron>

      <Container>
        {/* <Dropdown overlay={menu} onChange={(value) => {alert(value)}} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {selectedGenre} <DownOutlined />
            </a>
        </Dropdown> */}

        <DropdownSelection
          data={final_genres}
          handleClick={setSelectedGenre}
          current={selectedGenre}
          default="-- Select a Genre --"
        />

        <Button bsStyle="primary" onClick={() => {setSelectedGenre("-- Select a Genre --"); setSelectedYear(null); alert(selectedGenre)}}>Reset</Button>

        <BarGraph
          data={newData}
          title={"Number of Performance over time"}
          xaxis={"year"}
          yaxis={"value"}
          yaxisName={"Number of Performances"}
          activeIndex = {selectedYear}
          click={setSelectedYear}
        />

        <EventList
          data={eventList}
          attribute={[
            "Performance_Title",
            "Genres_concatenated",
            "Date",
            "Time",
          ]}
        ></EventList>
      </Container>
    </Layout>
  )
}

export default Genre

export const data = graphql`
  query Genre {
    page: googleDocs(slug: { eq: "/highlights/visualize-by-major-genre" }) {
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
