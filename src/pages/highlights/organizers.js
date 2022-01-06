import * as React from "react"
import { Container, Jumbotron } from "react-bootstrap"
import BarGraph from "../../components/BarGraph/BarGraph.js"
import EventList from "../../components/EventList/EventList.js"
import PieChart from "../../components/PieChart/PieChart.js"
import Layout from "../../components/Layout/Layout.js"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

import DropdownSelection from "../../components/DropdownSelection/DropdownSelection.js"

const Organizer = ({ data: { populationData, chartData, sponsorData } }) => {
  var eventDetails = chartData.nodes
  var eventList = []
  const years = []
  const newData = []
  var sponsorGraphData = []
  var lookup = {}

  for (var i = 0; i < sponsorData.distinct.length; i++) {
    var type = sponsorData.distinct[i]
    sponsorGraphData.push({ name: type, value: 0 })
  }

  for (i = 0; i < sponsorData.nodes.length; i++) {
    var pair = sponsorData.nodes[i]
    lookup[pair.sponsor] = pair.type
  }

  var populationGraphData = populationData.nodes.map(function (d) {
    d.value = parseInt(d.value, 10)
    return d
  })
  const [selectedOrganizer, setSelectedOrganizer] = React.useState(
    "-- Select an Organizer --"
  )
  const [selectedYear, setSelectedYear] = React.useState(null)

  const organizers = chartData.distinct
  const distinct_organizers = []
  organizers.map(organizer => {
    var curr_organizers = []
    curr_organizers = organizer.split(";")
    for (var i = 0; i < curr_organizers.length; i++) {
      var curr_organizer = curr_organizers[i].trim()
      var sponsor_type = lookup[curr_organizer]
      for (var j = 0; j < sponsorGraphData.length; j++) {
        if (sponsorGraphData[j].name === sponsor_type) {
          sponsorGraphData[j].value += 1
        }
      }

      if (!distinct_organizers.includes(curr_organizer)) {
        distinct_organizers.push(curr_organizer)
      }
    }
    return organizers
  })

  if (selectedOrganizer === "-- Select an Organizer --") {
    eventDetails = chartData.nodes
  } else {
    eventDetails = chartData.nodes.filter(event =>
      event.Organizers_concatenated.includes(selectedOrganizer)
    )
  }

  eventDetails.map(event => {
    if (selectedYear && event.Date.slice(0, 4) === selectedYear) {
      eventList.push(event)
    } else if (!selectedYear) {
      eventList.push(event)
    }

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
      <Seo title={"Visualize by Major Organizers"} />
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
          Visualize by Major Organizers
        </h1>
      </Jumbotron>

      <Container>
        <BarGraph
          data={populationGraphData}
          title={"Number of Japanese Residents in Singapore Over Time"}
          xaxis={"year"}
          yaxis={"value"}
          yaxisName={"Number of Japanese Residents"}
        />

        <PieChart
          data={sponsorGraphData}
          radius={100}
          innerRadius={30}
          containerHeight={400}
          color={"#5b0e2d"}
          title="The Sponsors of Japanese Performances"
        />

        <DropdownSelection
          data={distinct_organizers}
          handleClick={setSelectedOrganizer}
          current={selectedOrganizer}
          default="-- Select an Organizer --"
        />

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
            "Genres_concatenated",
            "Date",
            "Time",
          ]}
        ></EventList>
      </Container>
    </Layout>
  )
}

export default Organizer

export const data = graphql`
  query Organizer {
    populationData: allJpInSgCsv {
      nodes {
        year: Year
        value: Num_of_Japanese_living_in_Singapore__as_of_October_of_each_year_
      }
    }
    chartData: allJpsgCsv {
      distinct(field: Organizers_concatenated)
      nodes {
        Date
        English_name_of_performing_troupes__performers_concatenated
        Genres_concatenated
        Performance_Title
        Time
        Organizers_concatenated
        Venue_concatenated
        Latitude
        Longtitude
      }
    }
    sponsorData: allSponsorTypeLookupCsv {
      nodes {
        type: Org_Spon_Type_1
        sponsor: Organiser_Sponsor
      }
      distinct(field: Org_Spon_Type_1)
    }
  }
`
