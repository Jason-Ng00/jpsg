import * as React from "react"
import { Container, Jumbotron, Carousel, Col, Row, Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"


import Layout from "../../components/Layout/Layout.js"
import Seo from "../../components/seo"
import { graphql } from "gatsby"

import organizers1 from "../../images/organizers/japanese cultural society singapore.jpg"
import organizers2 from "../../images/organizers/japan creative centre.png"
import organizers3 from "../../images/organizers/the japan foundation.png"
import organizers4 from "../../images/organizers/the japanese association singapore.png"
import organizers5 from "../../images/organizers/national arts council.png"
import organizers6 from "../../images/organizers/national theatre trust.jpg"
import organizers7 from "../../images/organizers/national library board.jpg"
import organizers8 from "../../images/organizers/vivid creations.png"

const Organizers = ({
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
         Organizers
        </h1>
      </Jumbotron>
      <Container>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Container>

      <Container>

      <table>
            <tr>
              <td>Image</td>
              <td>Major Organizers</td>
              <td>Description</td>
            </tr>

            <tr>
              <td>
                <img src={organizers1} width="300px" height="200px" alt="venue" />
              </td>
              <td>Japanese Cultural Society Singapore</td>
              <td>
              The Japanese Cultural Society Singapore (JCSS) is an organisation 
              that actively promotes Japanese cultural activities. It holds 
              regular classes on Japanese arts, such as Japanese folk dance 
              and Origami. It is also the organiser of The Japanese Cultural 
              Festival that is held annually over the span of a few months 
              between August and October. The festival boosts many public 
              performances, exhibitions, and contests for the public to 
              engage in. Over the years, they have brought in Japanese folk 
              dance, Nihon Buyo, and Traditional Japanese music performers to 
              name a few.
              </td>
            </tr>

            <tr>
              <td>
                <img src={organizers2} width="300px" height="200px" alt="venue" />
              </td>
              <td>Japan Creative Centre</td>
              <td>
              The Japan Creative Centre (JCC) was set up based on agreements 
              made during the March and November 2007 Japan-Singapore summit 
              meetings. It is used as a platform for showcasing the various 
              "soft powers" of Japan, such as the traditional arts, fashion, 
              technologies, etc. The JCC has a Multi-purpose Hall where a 
              variety of performances or lecture demonstrations were held 
              since the JCC was opened, such as Nihon Buyo and Japanese 
              folk dance performances.
              </td>
            </tr>

            <tr>
              <td>
                <img src={organizers3} width="300px" height="200px" alt="venue" />
              </td>
              <td>The Japan Foundation</td>
              <td>
              Established in Oct 1972, one of the main objectives of the Japan 
              Foundation is to build relationships and mutual understanding 
              between Japan and the rest of the world through cultural exchange 
              and constant dialogue. It is also an active supporter of the 
              various performances that have been put up in Singapore.
              </td>
            </tr>

            <tr>
              <td>
                <img src={organizers4} width="300px" height="200px" alt="venue" />
              </td>
              <td>The Japanese Association, Singapore</td>
              <td>
              The Japanese Association, Singapore was established in 1915, with a 
              history of over 100 years. While the role of the JAS has changed 
              over the years, it is currently focused on providing the space for 
              cultural exchange and also a place for its members to meet and 
              relax. It is also often the organiser and/or sponsor of various 
              performances and concerts held at their premises, ranging from 
              Traditional Japanese music to Rakugo, and large scale activities 
              such as the annual summer festival.
              </td>
            </tr>

            <tr>
              <td>
                <img src={organizers5} width="300px" height="200px" alt="venue" />
              </td>
              <td>National Arts Council</td>
              <td>
              The National Arts Council (NAC) was established in 1991 as the merger of 
              the Singapore Cultural Foundation, Cultural Division of Ministry of 
              Community Development, Festival of Arts Secretariat and the National 
              Theatre Trust. Through various methods from grants to the management 
              of art spaces, the NAC is the champion of the arts in Singapore. 
              It also organises many large festivals and events, such as The 
              Singapore Arts Festival. The Festival had invited many Japanese 
              performers throughout the years it was held. In 2013, a decision 
              was made to have a separate company, Arts House Limited, run the 
              festival with a new direction and the festival was renamed the 
              Singapore International Festival of the Arts
              </td>
            </tr>

            <tr>
              <td>
                <img src={organizers6} width="300px" height="200px" alt="venue" />
              </td>
              <td>National Theatre Trust</td>
              <td>
              The National Theatre Trust was set up as a result of a bill passed on 
              16 November 1960, and was tasked with the operations of the National 
              Theatre, as well as to nurture an appreciation of the arts amongst 
              the people at the time. It also managed the National Theatre Fund. 
              However, following the closure of the National Theatre in 1984, 
              it was merged with a few other organisations such as the Singapore 
              Cultural Foundation to form the National Arts Council in 1991.
              </td>
            </tr>

            <tr>
              <td>
                <img src={organizers7} width="300px" height="200px" alt="venue" />
              </td>
              <td>National Library Board</td>
              <td>
              Established on 1 September 1995 as a statutory board, the National 
              Library Board (NLB) is an agency under the Ministry of Communications 
              and Information (MCI) and runs 27 libraries, including the National 
              Library. The NLB often collaborates with agencies or institutions, 
              such as The Japanese Association, Singapore (JAS), to put up various 
              performances in branches of their libraries. One example of this was 
              in 2015, where they held kamishibai performances in several of their 
              libraries.
              </td>
            </tr>

            <tr>
              <td>
                <img src={organizers8} width="300px" height="200px" alt="venue" />
              </td>
              <td>Vivid Creations</td>
              <td>
              Vivid Creations is an event management company that provides a large variety 
              of services including organization of theatrical productions. Its objective 
              is to "bring Japan to the world and vice versa". The Singapore branch office 
              has organised a series of successful events, such as the Shinosuke Rakugo 
              show.
              </td>
            </tr>

          </table>
          </Container>


    </Layout>
  )
}

export default Organizers

export const data = graphql`
  query Organizers {
    page: googleDocs(slug: { eq: "/about-this-project/organizers" }) {
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
