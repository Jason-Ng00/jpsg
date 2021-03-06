import * as React from "react"
import { Container, Jumbotron } from "react-bootstrap"
import BarGraph from "../../components/BarGraph/BarGraph.js"

import Layout from "../../components/Layout/Layout.js"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

const Pop = ({
  data: {
    page: {
      name,
      cover,
      description,
      childMarkdownRemark: { html },
    },
    chartData,
    populationData, 
  },
}) => {
  const pageTitle = name.split("_").pop()
  const years = []
  const newData = []
  chartData.eventList
    .map(event => ({
      year: event.day.slice(0, 4),
      value: event.value,
    }))
    .map(event => {
      if (!years.includes(event.year)) {
        years.push(event.year)
        newData.push({
          year: event.year,
          value: event.value,
        })
      } else {
        for (var data of newData) {
          if (data.year === event.year) {
            data.value += event.value
          }
        }
      }
      return newData
    })

    var populationGraphData = populationData.nodes.map(function (d) {
      d.value = parseInt(d.value, 10)
      return d
    })
    
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
      <Seo title={pageTitle} />

      <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
        <h1
          style={{
            justifyContent: "center",
            height: "100px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Population Trend Mapping Over Number of Performances
        </h1>
      </Jumbotron>

      <Container>
      <div>
          Chronological chart of number of Japanese people residing in Singapore
          and number of performances.
        </div>
      <BarGraph
          data={populationGraphData}
          title={"Number of Japanese Residents in Singapore Over Time"}
          xaxis={"year"}
          yaxis={"value"}
          yaxisName={"Number of Japanese Residents"}
        />

        <BarGraph
          data={newData}
          title={"Number of Performance over time"}
          xaxis={"year"}
          yaxis={"value"}
          yaxisName={"Number of Performances"}
        />
      </Container>
    </Layout>
  )
}

export default Pop

export const data = graphql`
  query Pop {
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

    populationData: allJpInSgCsv {
      nodes {
        year: Year
        value: Num_of_Japanese_living_in_Singapore__as_of_October_of_each_year_
      }
    }

    chartData: allJpsgCsv {
      distinct(field: Performance_types_concatenated)
      eventList: group(field: Date) {
        day: fieldValue
        value: totalCount
      }

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
