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
            backgroundColor: "#FFEEDD",
            height: "130px",
            display: "flex",
            alignItems: "center",
            color: "#808080",
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
