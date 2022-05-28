import * as React from "react"
import { Container, Jumbotron, Carousel, Col, Row, Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"


import Layout from "../../components/Layout/Layout.js"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

import genre1 from "../../images/genres/butoh.jpeg"
import genre2 from "../../images/genres/gagaku.png"
import genre3 from "../../images/genres/kabuki.jpg"
import genre4 from "../../images/genres/kagura.jpeg"
import genre5 from "../../images/genres/kyogen.jpg"
import genre6 from "../../images/genres/nihon buyo.jpg"
import genre7 from "../../images/genres/noh.png"
import genre8 from "../../images/genres/rakugo.png"
import genre9 from "../../images/genres/traditional japanese music.jpeg"

import genre10 from "../../images/genres/picture1.png"
import genre11 from "../../images/genres/picture2.png"

const Genres = ({
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
          Genres
        </h1>
      </Jumbotron>
      <Container>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>

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


    </Layout>
  )
}

export default Genres

export const data = graphql`
  query Genres {
    page: googleDocs(slug: { eq: "/about-this-project/genres" }) {
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
