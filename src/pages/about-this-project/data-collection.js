import * as React from "react"
import { Container, Jumbotron, Carousel, Col, Row, Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"


import Layout from "../../components/Layout/Layout.js"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

import dataCollection1 from "../../images/data collection/picture1.png"
import dataCollection2 from "../../images/data collection/picture2.png"

const DataCollection = ({
  data: {
    page: {
      name,
      cover,
      description,
      childMarkdownRemark: { html },
    },
    chartData,
    lineData,
  },
}) => {
    
  return (
    <Layout>
      {/* <Seo title={pageTitle} /> */}
      {cover && (
          <GatsbyImage
            image={cover.image.childImageSharp.gatsbyImageData}
            alt={cover.alt}
            title={cover.title}
            style={{
              height: `500px`,
              display: `flex`,
              justifyContent: `center`,
              marginBottom: `15px`,
            }}
            imgStyle={{ objectPosition: "0px" }}
          />
        )}
      <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
        <h1
          style={{
            justifyContent: "center",
            height: "100px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Data Collection
        </h1>
      </Jumbotron>
      <Container>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>

      <Container>

          <Row>
            <Col xs={5}>
              <Card className="dataCollectionCard">
                <Card.Img
                  variant="top"
                  src={dataCollection1}
                  width="200px"
                  height="600px"
                />
                <Card.Body>
                  <Card.Text>
                    The Matsumoto Ballet Company from Japan: National Theatre, 2
                    Sep 1977, 8pm. (Source: National Theatre Trust Collection,
                    courtesy of National Archives of Singapore)
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={5}>
              <Card className="dataCollectionCard">
                <Card.Img
                  variant="top"
                  src={dataCollection2}
                  width="200px"
                  height="600px"
                />
                <Card.Body>
                  <Card.Text>
                    Nihon Buyo: Lee Foundation Theatre, Nanyang Academy of Fine
                    Arts, 4 & 5 November 2010, 7pm - 8.30pm (Source:{" "}
                    <a href="https://www.sg.emb-japan.go.jp/JCC/event_BUYO_04112010.html">
                      Japan Creative Centre
                    </a>
                    )
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </Container>


    </Layout>
  )
}

export default DataCollection

export const data = graphql`
  query DataCollection {
    page: googleDocs(slug: { eq: "/about-this-project/data-collection" }) {
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
  }
`
