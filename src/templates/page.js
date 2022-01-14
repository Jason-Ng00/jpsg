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

import genre10 from "../images/genres/picture1.png"
import genre11 from "../images/genres/picture2.png"

import genre1 from "../images/genres/butoh.jpg"
import genre2 from "../images/genres/gagaku.png"
import genre3 from "../images/genres/kabuki.png"
import genre4 from "../images/genres/kagura.jpg"
import genre5 from "../images/genres/kyogen.jpg"
import genre6 from "../images/genres/nihon buyo.jpg"
import genre7 from "../images/genres/noh.png"
import genre8 from "../images/genres/rakugo.png"
import genre9 from "../images/genres/traditional japanese music.png"


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
              backgroundColor: "#FFEEDD",
              height: "130px",
              display: "flex",
              alignItems: "center",
              color: "#808080",
            }}
          >
            {description}
          </h1>
        )}
      </Jumbotron>
      <Container>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {pageTitle === "Venues" && (
          <table>
            <tr>
              <td>Image</td>
              <td>Major Venue</td>
              <td>Description</td>
            </tr>

            <tr>
              <td>
                <img src={venue1} width="300px" height="200px" alt="venue" />
              </td>
              <td>DBS Auditorium</td>
              <td>
                The DBS Auditorium was located in the now defunct DBS Building
                Tower 1 at Shenton Way, and has a seating capacity of 380. A
                variety of Japanese performances have been hosted there, from
                music concerts to rakugo performances.
              </td>
            </tr>

            <tr>
              <td>
                <img src={venue2} width="300px" height="200px" alt="venue" />
              </td>
              <td>Drama Centre</td>
              <td>
                Originally located at Fort Canning Park, Drama Centre was the
                major stage for performances in the1980s, with many local
                companies staging their plays there. It was closed on 15 July
                2002 to make way for the expansion of the Singapore History
                Museum. The Drama Centre was reopened in 2005 in the new
                National Library building on Bras Basah Road. The new Drama
                Centre is a National Arts Council arts venue, and is managed by
                Arts House Ltd. It offers a 615-seat proscenium theatre, a
                120-seater black box, VIP lounge and a function room.
              </td>
            </tr>

            <tr>
              <td>
                <img src={venue3} width="300px" height="200px" alt="venue" />
              </td>
              <td>Esplanade</td>
              <td>
                Opened in 2002, the Esplanade – Theatres on the Bay, is
                Singapore’s national performing arts centre. The iconic
                performing arts centre includes the Esplanade Concert Hall, the
                Esplanade Theatre, the Esplanade Recital Studio, the Esplanade
                Theatre Studio, and the Esplanade Annexe Studio. A new theatre,
                the Waterfront Theatre is under construction and is expected to
                open in 2021. The Esplanade – Theatres on the Bay is currently
                operated by The Esplanade Co Ltd (TECL), a non-profit
                organisation.
              </td>
            </tr>

            <tr>
              <td>
                <img src={venue4} width="300px" height="200px" alt="venue" />
              </td>
              <td>Japan Creative Centre</td>
              <td>
                Opened in 2009, the Japan Creative Centre (JCC) was established
                under a joint-agreement between the Singapore and Japanese
                governments to promote Japanese culture in Singapore. The
                Centre’s Multi-purpose Hall is often used for various
                performances and lecture demonstrations or workshops, fulfilling
                its objectives of showcasing Japan's soft power.
              </td>
            </tr>

            <tr>
              <td>
                <img src={venue5} width="300px" height="200px" alt="venue" />
              </td>
              <td>Jubilee Hall at Raffles Hotel</td>
              <td>
                Opened in 1991, Jubilee Hall was a Victorian-style theatre
                playhouse with a seating capacity of 388 located in the iconic
                Raffeles Hotel. The theatre was closed due to the hotel’s
                restoration in 2017. After the completion of the restoration in
                mid-2019, the theatre will be transformed into a grand ballroom.
              </td>
            </tr>

            <tr>
              <td>
                <img src={venue6} width="300px" height="200px" alt="venue" />
              </td>
              <td>Kallang Theatre</td>
              <td>
                Originally opened on February 23, 1970 as the "Kallang Cinema,"
                it was the largest movie theatre in Singapore then. The Kallang
                theatre became a full-fledged live performance theatre after the
                closure of the National Theatre in 1986, when the National
                Theatre Trust moved there. With 1744 seats in its large
                auditorium, Kallang Theatre has hosted a variety of performances
                and events, from concerts, drama performances to important
                congregational and ceremonial functions. The Kallang Theatre is
                now under the management of Asia Arts & Culture Pte Ltd.
              </td>
            </tr>

            <tr>
              <td>
                <img src={venue7} width="300px" height="200px" alt="venue" />
              </td>
              <td>Marina Bay Sands</td>
              <td>
                Opened in 2010, the MasterCard Theatres at Marina Bay Sands is
                home to the Grand Theatre and Sands Theatre. The Grand Theatre
                has a seating capacity of up to 2,155 over three levels, and the
                Sands Theatre has a seating capacity of 1,680 guests on two
                levels. Both of the theatres are located in the Shoppes at
                Marina Bay Sands.
              </td>
            </tr>

            <tr>
              <td>
                <img src={venue8} width="300px" height="200px" alt="venue" />
              </td>
              <td>National Theatre</td>
              <td>
                The National Theatre was a public theatre used for performances,
                concerts and conferences, and was built to commemorate
                Singapore's achievement of self-government in 1959. Opened on 8
                August 1963, the National Theatre has an open-air auditorium
                with a seating capacity of 3,420. It has a stage with a 50-ft
                (15.2 m) diameter revolving platform and ample provisions for
                dressing rooms and storage space. Usage of the theatre declined
                subsequently as it was not air-conditioned. It was closed on 16
                January 1984 as it was deemed to be structurally unsafe, and was
                eventually demolished in 1986.
              </td>
            </tr>

            <tr>
              <td>
                <img src={venue9} width="300px" height="200px" alt="venue" />
              </td>
              <td>Singapore Conference Hall</td>
              <td>
                Officially opened on 15th October 1965, the Singapore Conference
                Hall was a venue for conferences and exhibitions in the 1960s
                and 1970s. It underwent renovation works in September 1999 and
                was reopened on 22nd September 2001 as a modernised concert hall
                boasting a 831 seating capacity. Other than the concert hall,
                there are also a multi-purpose venue, an Exhibition Hall, a
                multi-functional Sectional Practice Hall, and a concourse that
                functions as VIP Lounge.
              </td>
            </tr>

            <tr>
              <td>
                <img src={venue10} width="300px" height="200px" alt="venue" />
              </td>
              <td>Victoria Theatre and Concert Hall</td>
              <td>
                Victoria Theatre and Concert Hall are Singapore’s oldest
                performing arts venue to date. The VTCH today comprises of two
                buildings – formerly Victoria Memorial Hall and Town Hall, which
                are joined by a clock tower. The Town Hall was converted into a
                theatre and renamed Victoria Theatre in 1909. The Victoria
                Memorial Hall was renamed Victoria Concert Hall in 1979 after
                extensive renovations to upgrade and improves the facilities,
                and has since become the home of the Singapore Symphony
                Orchestra (SSO). In 2010, the VTCH underwent another four-year
                renovation, and reopened in July 2014. The VTCH now has a
                614-seat Theatre and a 673-seat Concert Hall, with two smaller
                rooms for music, dance and theatre rehearsals. It is currently
                managed by the Arts House Ltd.
              </td>
            </tr>
          </table>
        )}
        {pageTitle === "Genre" && (
          <Container>

          <table>
            <tr>
              <td>Image</td>
              <td>Major Genre</td>
              <td>Description</td>
            </tr>

            <tr>
              <td>
                <img src={genre1} width="300px" height="200px" alt="venue" />
              </td>
              <td>Butoh</td>
              <td>
              Also known as Ankoku Butoh (Dance of Darkness), this unique dance form was developed by avant-garde dancers 
              Hijikata Tatsumi (1928 – 1986) and Ōno Kazuo (1906 – 2010) in 1959. It was created as a reaction against the 
              repressive post-war Japanese cultural scene, and as a style that defied mainstream traditional Japanese aesthetics. 
              There are many Butoh dance troupes within and outside of Japan in today, and some of them, such as the Sankai 
              uku, enjoy international fame and regularly perform overseas.
              </td>
            </tr>

            <tr>
              <td>
                <img src={genre2} width="300px" height="200px" alt="venue" />
              </td>
              <td>Gagaku</td>
              <td>
                Gagaku is the oldest forms of court music originating in the Nara period for use in ritual performances. It is developed 
                from music from the Tang dynasty that was transmitted via the Korean peninsula to Japan around the sixth century. 
                Key musical instruments used in Gagaku include the Shō; Hichiriki; Gakudaiko and Gakubiwahe. The Japanese Imperial Household 
                Agency of Japan also has a music department dedicated to Gagaku. In 2007, Gagaku was recognized by UNESCO as an Intangible 
                Cultural Heritage of Humanities.
              </td>
            </tr>

            <tr>
              <td>
                <img src={genre3} width="300px" height="200px" alt="venue" />
              </td>
              <td>Kabuki</td>
              <td>
              Developed in the 1600s as an entertainment form for the townspeople in Edo (Tokyo), Kabuki is one of the four major traditional 
              Japanese performance genres today. Kabuki is characterized by dramatic stylized movement, elaborate makeup, and complex plots 
              performed on a specially designed stage with an extension (hanamichi) into the audience seats. In 2008, Kabuki was inscribed by 
              UNESCO as Intangible Cultural Heritage of Humanities. Some contemporary versions of Kabuki performance include the Super Kabuki 
              developed by Ichikawa Ennosuke III, and Takizawa Kabuki, which was developed by one of Johnny Entertainment’s pop idols Takizawa 
              Hideaki.
              </td>
            </tr>

            <tr>
              <td>
                <img src={genre4} width="300px" height="200px" alt="venue" />
              </td>
              <td>Kagura</td>
              <td>
              The name Kagura has been in use since the ninth century, although music and dance identified as Kagura have been performed in Shintō 
              rituals and ceremonies as early as ancient times. Kagura uses music, chanting, dance, and musical instruments to perform tales from 
              Japanese mythology in regional festivals and religious ceremonies. Today, there are several schools of Kagura located in different regions in Japan. 
              </td>
            </tr>

            <tr>
              <td>
                <img src={genre5} width="300px" height="200px" alt="venue" />
              </td>
              <td>Kyogen</td>
              <td>
              Kyogen is one of the four major traditional performance genres today and was inscribed by UNESCO as an Intangible Cultural Heritage of Humanities in 
              2008. Kyogen developed closely with Noh. The plays are generally short, humorous, and highly stylized, using very few props. Most Kyogen plays have 
              just two to three performers. Although music and dance are not essential components of the genre, some plays have noh style chanting and dance. 
              Kyogen performed within a noh play is called Ai-Kyogen. Ai-kyogen is usually performed between two parts in a Noh play where the main characters 
              retreat, usually to change costumes for the second part of the play.
              </td>
            </tr>

            <tr>
              <td>
                <img src={genre6} width="300px" height="200px" alt="venue" />
              </td>
              <td>Nihon Buyo</td>
              <td>
              Performed by both male and female dancers, Nihon Buyo literally means “Dance of Japan.” It was developed in the 17th century from dance pieces performed 
              in Kabuki plays, while also integrating elements from earlier folk dances as well as music and movements from Noh. In contemporary times some new pieces 
              have been created although the basis of Nihon Buyo is still rooted in Kabuki dance.
              </td>
            </tr>

            <tr>
              <td>
                <img src={genre7} width="300px" height="200px" alt="venue" />
              </td>
              <td>Noh</td>
              <td>
              Beginning in the early 1300s, Noh evolved from a plebian theatrical entertainment to become one of the military leadership’s preferred cultural activities 
              by the 1400s. Noh plays are divided broadly into dream plays and plays that happen in the present time. Characters speak, sing, and dance in a highly stylized 
              manner with the accompaniment of an eight-member chorus, two to three drums, and a flute. Each individual play is made up of segments that are sometimes 
              performed independently, especially the dance segments. Noh is one of the four major traditional Japanese performance genres today and was inscribed by 
              UNESCO as an Intangible Cultural Heritage of Humanities in 2008. Contemporary Noh plays include newly created plays (shinsaku-nō) and Noh in English (eigo-nō).
              </td>
            </tr>

            <tr>
              <td>
                <img src={genre8} width="300px" height="200px" alt="venue" />
              </td>
              <td>Rakugo</td>
              <td>
              Established in the 17th century as one of the popular entertainment forms for the townspeople, Rakugo is a one-person performance with the performer usually sitting 
              on a cushion (zabuton), using a fan and a hand cloth as the only props. The performer plays multiple roles in an often complicated story that ends with a pun. 
              Since the 1980s some Rakugo performers have been performing in English.
              </td>
            </tr>

            <tr>
              <td>
                <img src={genre9} width="300px" height="200px" alt="venue" />
              </td>
              <td>Traditional Japanese music</td>
              <td>
              Traditional Japanese music is used here to refer to the body of music performed with traditional Japanese percussion, string, and wind instruments. 
              Examples of percussion instruments include Taiko, Tsutsumi, Kane, etc. String instruments include Koto, Shamisen, Biwa, etc. Wind instruments 
              include Noh-kan, Shakuhachi, Hichiriki and Shō. Today, all these musical instruments are used to perform in both the traditional genres such as 
              Gagaku, Noh, and Nihon Buyo, as well as in modern genres including Jazz and pop music. They are also often played together with other western 
              instruments such as in a symphony orchestra.
              </td>
            </tr>
          </table>

          <Row>
            <Col xs={5}>
              <Card className="genreCard">
                <Card.Img
                  variant="top"
                  src={genre10}
                  width="200px"
                  height="600px"
                />
                <Card.Body>
                  <Card.Text>
                    A poster of Nihon Buyo performance - Takarazuka Revue:
                    National Theatre, 11-12 December 1982. (Source: National
                    Theatre Trust Collection, courtesy of National Archives of
                    Singapore)
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={5}>
              <Card className="genreCard">
                <Card.Img
                  variant="top"
                  src={genre11}
                  width="200px"
                  height="600px"
                />
                <Card.Body>
                  <Card.Text>
                    A poster of Jazz performance - Jazz of Japan by Nabua Hara
                    and his Sharps & Flats: Victoria Theatre, 21 & 22 January
                    1978 at 8.30 pm (Source: National Theatre Trust Collection,
                    courtesy of National Archives of Singapore)
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </Container>
        )}

        {pageTitle === "Data Collection" && (
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
        )}
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
