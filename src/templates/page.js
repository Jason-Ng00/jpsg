import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

import "./page.scss"
import Layout from "../components/Layout/Layout.js";
import Seo from "../components/seo";
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'


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
        {description && <h1 style={{ justifyContent: "center", backgroundColor:"#FFEEDD", height:"130px", display:"flex", alignItems:"center",color:"#808080"}}>
          {description}
        </h1>}


      </Jumbotron>
      <Container>
          <div dangerouslySetInnerHTML={{ __html: html }} />
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