/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

// node_modules/gatsby-source-google-docs/utils/generate-token.js
// GOOGLE_OAUTH_CLIENT_ID=470757202908-me6bunjabst6l6eljn2uccq88jlh0c2m.apps.googleusercontent.com
// GOOGLE_OAUTH_CLIENT_SECRET=TRy2BVm3qCakCfunJTIEX6JQ

import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../Header/Header.js"
import Navbar from "../Navbar/Navbar.js"
import Footer from "../Footer/Footer.js"
import * as styles from "./Layout.module.scss"

import { motion } from "framer-motion"
import { Container } from 'react-bootstrap'
import { MDXProvider } from "@mdx-js/react"



const Layout = ({ children }) => {
  return (

    <Container className={styles.layout}>
    <Header />
    <Navbar />

    <motion.main className={styles.contentContainer}
         initial={{ opacity: 0, x: -200 }}
         animate={{ opacity: 1, x: 0 }}
         exit={{ opacity: 0, x: 200 }}
         transition={{
           type: "spring",
           mass: 0.35,
           stiffness: 75,
           duration: 1.0
           }}>

        {children}
        <footer style={{textAlign:"center", marginTop:"100px", paddingBottom:"30px", fontSize:"10px"}}>
          In collaboration with <a href="http://libds.nus.edu.sg/">NUS Libraries</a>. <a href="http://datavis.sg/">Powered by Datavis</a>.    
        </footer>

      
      </motion.main>
      <Footer />
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
