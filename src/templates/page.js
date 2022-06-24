import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

import "./page.scss"
import Layout from "../components/Layout/Layout.js"
import Seo from "../components/seo"
import { Container, Jumbotron, Carousel, Col, Row, Card } from "react-bootstrap"

import image1 from "../images/carousel/chingay 2021_jas.jpeg"
import image2 from "../images/carousel/Singapore National Theatre.png"
import image3 from "../images/carousel/performance2016.png"
import image4 from "../images/carousel/Kamishibai 2016.png"

const pageFromGDocs = ({
  data: {
    page: {
      name,
      cover,
      description,
      childMarkdownRemark: { html },
    },
  },
}) => {
  const pageTitle = name.split("_").pop()
  return (
    <Layout>
      <Seo title={pageTitle} />
      <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
        {pageTitle === "Introduction" && (
          <Carousel width="100%" interval="3000" showThumbs={false}>
            <Carousel.Item>
              <img
                className="d-block w-100 carouselImg"
                src={image1}
                height="500px"
                alt="slide 1"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carouselImg"
                src={image2}
                height="500px"
                alt="slide 2"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carouselImg"
                src={image3}
                height="500px"
                alt="slide 3"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carouselImg"
                src={image4}
                height="500px"
                alt="slide 4"
              />
            </Carousel.Item>
          </Carousel>
        )}

        {cover && pageTitle !== "Introduction" && (
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
        {description && (

          <h1
            style={{
              justifyContent: "center",
              backgroundColor: "transparent",
              height: "130px",
              display: "flex",
              alignItems: "center",
              color: "#000000",
            }}
          >
            {description}
          </h1>
        )}
      </Jumbotron>
      <Container>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Page($path: String!) {
    page: googleDocs(slug: { eq: $path }) {
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

export default pageFromGDocs
          {/* <h1
            style={{
              justifyContent: "center",
              backgroundColor: "#FFEEDD",
              height: "130px",
              display: "flex",
              alignItems: "center",
              color: "#808080",
            }}
          > */}