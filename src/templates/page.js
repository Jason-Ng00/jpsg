import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import "./page.scss"
import Layout from "../components/Layout/Layout.js";
import Seo from "../components/seo";
import { Container, Jumbotron, Carousel, Col, Row, Card} from 'react-bootstrap'

import image1 from "../images/carousel/chingay 2021_jas.jpeg"
import image2 from "../images/carousel/Singapore National Theatre.png"
import image3 from "../images/carousel/performance2016.png"
import image4 from "../images/carousel/Kamishibai_NLB_Nov2015.jpg"

import venue1 from "../images/venues/dbs-2fynqgp.jpg"
import venue2 from "../images/venues/dramacenter.png"
import venue3 from "../images/venues/esp-29m9pmu.jpg"
import venue4 from "../images/venues/jccentre-1klo04j.jpg"
import venue5 from "../images/venues/jhrh.png"
import venue6 from "../images/venues/kallangtheatre.png"
import venue7 from "../images/venues/marinabaysand.png"
import venue8 from "../images/venues/nationaltheatre.png"
import venue9 from "../images/venues/sgconferencehall.png"
import venue10 from "../images/venues/victorial.png"

import genre1 from "../images/genres/picture1.png"
import genre2 from "../images/genres/picture2.png"

import dataCollection1 from "../images/data collection/picture1.png"
import dataCollection2 from "../images/data collection/picture2.png"

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
  const pageTitle = name.split("_").pop();
  return (
    <Layout>
      <Seo title={pageTitle}/>
      <Jumbotron style={{ backgroundColor: "#F2F4F8", padding: `0` }}>
      {pageTitle === "Introduction" && (

        <Carousel width="100%" interval="3000" showThumbs = {false}>
        <Carousel.Item>
              <img className="d-block w-100 carouselImg" src={image1} height = "500px" alt="slide 1" />
        </Carousel.Item>
        <Carousel.Item>
              <img className="d-block w-100 carouselImg" src={image2} height = "500px" alt="slide 2"/>
        </Carousel.Item>
        <Carousel.Item>
              <img className="d-block w-100 carouselImg" src={image3} height = "500px" alt="slide 3"/>
        </Carousel.Item>
        <Carousel.Item>
              <img className="d-block w-100 carouselImg" src={image4} height = "500px" alt="slide 4"/>
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
        {description && <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
          {description}
        </h1>}


      </Jumbotron>
      <Container>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          {pageTitle === "Venues" && 
            <table>
              <tr>
                <td>Image</td>
                <td>Major Venue</td>
                <td>Description</td>
              </tr>

              <tr>
                <td>
                  <img src = {venue1} width = "300px" height = "200px" alt="venue" />
                </td>
                <td>DBS Auditorium</td>
                <td>The DBS Auditorium was located in the now defunct DBS Building Tower 1 at Shenton Way, and has a seating capacity of 380. A variety of Japanese performances have been hosted there, from music concerts to rakugo performances.</td>
              </tr>

              <tr>
                <td>
                  <img src = {venue2} width = "300px" height = "200px" alt="venue"/>
                </td>
                <td>Drama Centre</td>
                <td>Originally located at Fort Canning Park, Drama Centre was the major stage for performances in the1980s, with many local companies staging their plays there. It was closed on 15 July 2002 to make way for the expansion of the Singapore History Museum. The Drama Centre was reopened in 2005 in the new National Library building on Bras Basah Road. The new Drama Centre is a National Arts Council arts venue, and is managed by Arts House Ltd. It offers a 615-seat proscenium theatre, a 120-seater black box, VIP lounge and a function room.</td>
              </tr>

              <tr>
                <td>
                  <img src = {venue3} width = "300px" height = "200px" alt="venue"/>
                </td>
                <td>Esplanade</td>
                <td>Opened in 2002, the Esplanade – Theatres on the Bay, is Singapore’s national performing arts centre. The iconic performing arts centre includes the Esplanade Concert Hall, the Esplanade Theatre, the Esplanade Recital Studio, the Esplanade Theatre Studio, and the Esplanade Annexe Studio. A new theatre, the Waterfront Theatre is under construction and is expected to open in 2021. The Esplanade – Theatres on the Bay is currently operated by The Esplanade Co Ltd (TECL), a non-profit organisation.</td>
              </tr>

              <tr>
                <td>
                  <img src = {venue4} width = "300px" height = "200px" alt="venue"/>
                </td>
                <td>Japan Creative Centre</td>
                <td>Opened in 2009, the Japan Creative Centre (JCC) was established under a joint-agreement between the Singapore and Japanese governments to promote Japanese culture in Singapore. The Centre’s Multi-purpose Hall is often used for various performances and lecture demonstrations or workshops, fulfilling its objectives of showcasing Japan's soft power.</td>
              </tr>

              <tr>
                <td> 
                  <img src = {venue5} width = "300px" height = "200px" alt="venue"/>
                </td>
                <td>Jubilee Hall at Raffles Hotel</td>
                <td>Opened in 1991, Jubilee Hall was a Victorian-style theatre playhouse with a seating capacity of 388 located in the iconic Raffeles Hotel. The theatre was closed due to the hotel’s restoration in 2017. After the completion of the restoration in mid-2019, the theatre will be transformed into a grand ballroom.</td>
              </tr>

              <tr>
                <td> 
                  <img src = {venue6} width = "300px" height = "200px" alt="venue"/>
                </td>
                <td>Kallang Theatre</td>
                <td>Originally opened on February 23, 1970 as the "Kallang Cinema," it was the largest movie theatre in Singapore then. The Kallang theatre became a full-fledged live performance theatre after the closure of the National Theatre in 1986, when the National Theatre Trust moved there. With 1744 seats in its large auditorium, Kallang Theatre has hosted a variety of performances and events, from concerts, drama performances to important congregational and ceremonial functions. The Kallang Theatre is now under the management of Asia Arts & Culture Pte Ltd.</td>
              </tr>
              
              <tr>
                <td>
                  <img src = {venue7} width = "300px" height = "200px" alt="venue"/>
                </td>
                <td>Marina Bay Sands</td>
                <td>Opened in 2010, the MasterCard Theatres at Marina Bay Sands is home to the Grand Theatre and Sands Theatre. The Grand Theatre has a seating capacity of up to 2,155 over three levels, and the Sands Theatre has a seating capacity of 1,680 guests on two levels. Both of the theatres are located in the Shoppes at Marina Bay Sands.</td>
              </tr>
              
              <tr>
                <td>
                  <img src = {venue8} width = "300px" height = "200px" alt="venue"/>
                </td>
                <td>National Theatre</td>
                <td>The National Theatre was a public theatre used for performances, concerts and conferences, and was built to commemorate Singapore's achievement of self-government in 1959. Opened on 8 August 1963, the National Theatre has an open-air auditorium with a seating capacity of 3,420. It has a stage with a 50-ft (15.2 m) diameter revolving platform and ample provisions for dressing rooms and storage space. Usage of the theatre declined subsequently as it was not air-conditioned. It was closed on 16 January 1984 as it was deemed to be structurally unsafe, and was eventually demolished in 1986.</td>
              </tr>

              <tr>
                <td>
                  <img src = {venue9} width = "300px" height = "200px" alt="venue"/>
                </td>
                <td>Singapore Conference Hall</td>
                <td>Officially opened on 15th October 1965, the Singapore Conference Hall was a venue for conferences and exhibitions in the 1960s and 1970s. It underwent renovation works in September 1999 and was reopened on 22nd September 2001 as a modernised concert hall boasting a 831 seating capacity. Other than the concert hall, there are also a multi-purpose venue, an Exhibition Hall, a multi-functional Sectional Practice Hall, and a concourse that functions as VIP Lounge.</td>
              </tr>

              <tr>
                <td>
                  <img src = {venue10} width = "300px" height = "200px" alt="venue"/>
                </td>
                <td>Victoria Theatre and Concert Hall</td>
                <td>Victoria Theatre and Concert Hall are Singapore’s oldest performing arts venue to date. The VTCH today comprises of two buildings – formerly Victoria Memorial Hall and Town Hall, which are joined by a clock tower. The Town Hall was converted into a theatre and renamed Victoria Theatre in 1909. The Victoria Memorial Hall was renamed Victoria Concert Hall in 1979 after extensive renovations to upgrade and improves the facilities, and has since become the home of the Singapore Symphony Orchestra (SSO). In 2010, the VTCH underwent another four-year renovation, and reopened in July 2014. The VTCH now has a 614-seat Theatre and a 673-seat Concert Hall, with two smaller rooms for music, dance and theatre rehearsals. It is currently managed by the Arts House Ltd.</td>
              </tr>
            </table>
           }
           {pageTitle === "Genre" &&
            <Row>
           <Col>
            <Card className="genreCard">
              <Card.Img variant="top" src={genre1} width = "200px" height = "600px"/>
              <Card.Body>
              <Card.Text>
              A poster of Nihon Buyo performance - Takarazuka Revue: National Theatre, 11-12 December 1982. (Source: National Theatre Trust Collection, courtesy of National Archives of Singapore)
              </Card.Text>
              </Card.Body>
            </Card>
            </Col>

          <Col>
            <Card className="genreCard">
              <Card.Img variant="top" src={genre2} width = "200px" height = "600px" />
              <Card.Body>
              <Card.Text>
              A poster of Jazz performance - Jazz of Japan by Nabua Hara and his Sharps & Flats: Victoria Theatre, 21 & 22 January 1978 at 8.30 pm (Source: National Theatre Trust Collection, courtesy of National Archives of Singapore)
              </Card.Text>
              </Card.Body>
            </Card>
            </Col>

            </Row>
           }

           {pageTitle === "Data Collection" &&
            <Row>
           <Col>
            <Card className="dataCollectionCard">
              <Card.Img variant="top" src={dataCollection1} width = "200px" height = "600px"/>
              <Card.Body>
              <Card.Text>
              The Matsumoto Ballet Company from Japan: National Theatre, 2 Sep 1977, 8pm. (Source: National Theatre Trust Collection, courtesy of National Archives of Singapore)
              </Card.Text>
              </Card.Body>
            </Card>
            </Col>

          <Col>
            <Card className="dataCollectionCard">
              <Card.Img variant="top" src={dataCollection2} width = "200px" height = "600px" />
              <Card.Body>
              <Card.Text>
              Nihon Buyo: Lee Foundation Theatre, Nanyang Academy of Fine Arts, 4 & 5 November 2010, 7pm - 8.30pm (Source: <a href = "https://www.sg.emb-japan.go.jp/JCC/event_BUYO_04112010.html">Japan Creative Centre</a>)
              </Card.Text>
              </Card.Body>
            </Card>
            </Col>

            </Row>
           }
      </Container>
    </Layout>
  );
};

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
`;


export default pageFromGDocs;