import React, {useState} from 'react'
import * as styles from './Navbar.module.scss'
import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {graphql, useStaticQuery, Link} from "gatsby"


function HoverControlledDropdown(props) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <NavDropdown
            {...props}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            show={isHovered}
        />
    );
}

export default function NavBar({ location }) {
    const data = useStaticQuery(graphql`
    query MenuQuery {
      pagesPath: allGoogleDocs {
        edges {
          node {
            breadcrumb {
              name
              slug
            }
          }
        }
      }
    }
  `)

    var menuData = []
    var menuItem = []
    data.pagesPath.edges.map((edge) => {
      if(edge.node.breadcrumb.length === 1) {
        menuData.push(edge.node.breadcrumb)
      } else {
          if(!menuItem.includes(edge.node.breadcrumb[0].name)){
            menuItem.push(edge.node.breadcrumb[0].name)
            menuData.push(edge.node.breadcrumb)
          } else {
            for( var i =0; i < menuData.length; i++) {
              if(menuData[i][0].name === edge.node.breadcrumb[0].name) {
                menuData[i].push(edge.node.breadcrumb[1])
              }
           }
          }
      }
      return edge
  })

  const activeStyles={borderBottom: "3px solid #ef7c00", color:"#003D7C"};
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const menuSort = ["Introduction", "About this Project", "Historical Context", "Performance Records", "Highlights"]

  menuData.sort(function(a, b) {
    var keyA = menuSort.indexOf(a[0].name),
      keyB = menuSort.indexOf(b[0].name);
    // Compare the 2 year
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  return (
    <Container className={styles.navbar}>
        <Container>
        <Navbar expand="sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {/* <Link className={styles.navItemNoDropdown} activeStyle={activeStyles} to="/">Home</Link> */}
                
                {menuData.map((navItem) => {
                  if(navItem.length === 1) {
                      return <Link key={navItem[0].name} className={styles.navItemNoDropdown} activeStyle={activeStyles} to={navItem[0].slug}>{navItem[0].name}</Link>
                  } else { 
                      var rows=[];
                      var dropdownItem=[];
                      for( var i =1; i < navItem.length; i++) {
                        if(!dropdownItem.includes(navItem[i].name)){
                          rows.push(<Link key={navItem[i].name} className={styles.navDropdown} to={navItem[i].slug} target="_self">{navItem[i].name}</Link>)
                          dropdownItem.push(navItem[i].name)
                      }
                  }
                return <HoverControlledDropdown style={url.includes(navItem[0].name.toLowerCase()) ? activeStyles : {}} key={navItem[0].name} className={styles.navItemDropdown} title={navItem[0].name}>
                {/* return <HoverControlledDropdown style={url.includes(navItem[0].name.toLowerCase().replaceAll(" ","-")) ? activeStyles : {}} key={navItem[0].name} className={styles.navItemDropdown} title={navItem[0].name}> */}

                {rows}
             </HoverControlledDropdown>

            }
     })}
              {/* <HoverControlledDropdown style={url.includes("highlights".toLowerCase().replaceALl(" ","-")) ? activeStyles : {}} key="Highlights" className={styles.navItemDropdown} title="Highlights"> */}
              <HoverControlledDropdown style={url.includes("highlights") ? activeStyles : {}} key="Highlights" className={styles.navItemDropdown} title="Highlights">
                <Link key="Visualize by Genre" className={styles.navDropdown} to="/highlights/genre" target="_self">Visualize by Genre</Link>
                <Link key="Visualize by Major Venues" className={styles.navDropdown} to="/highlights/venue" target="_self">Visualize by Venues</Link>
                <Link key="Visualize by Mojor Organizers" className={styles.navDropdown} to="/highlights/organizers" target="_self">Visualize by Major Organizers</Link>
                <Link key="Population Trend Mapping" className={styles.navDropdown} to="/highlights/pop" target="_self">Population Trend Mapping</Link>
             </HoverControlledDropdown>

             <Link className={styles.navItemNoDropdown} activeStyle={activeStyles} to="/performances-by-timeline">Performances By Timeline</Link>
            </Nav>
            </Navbar.Collapse>

        </Navbar>
        </Container>
    </Container>

  )
}

