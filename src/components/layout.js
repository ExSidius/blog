import * as React from "react"
//import { Link } from "gatsby"
import { Navbar, Nav, Image } from "react-bootstrap"

import circle from "../images/gatsby-icon.png"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <Navbar variant="light" className="mb-4 px-3 py-3">
        <Navbar.Brand
          href="/"
          className="d-flex flex-row align-items-center blank-link title-link"
        >
          <Image src={circle} roundedCircle width="25px" className="mr-2" />
          {title}
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link
            href="https://github.com/zaycation/ramsmusings001"
            target="_blank"
            className="follow-btn"
          >
            View Src
          </Nav.Link>
        </Nav>
      </Navbar>
    )
  } else {
    header = (
      <Navbar variant="light" className="mb-4 px-3 py-3">
        <Navbar.Brand
          href="/"
          className="d-flex flex-row align-items-center blank-link title-link"
        >
          <Image src={circle} roundedCircle width="25px" className="mr-2" />
          {title}
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link
            href="https://github.com/zaycation/ramsmusings001"
            target="_blank"
            className="follow-btn"
          >
            View Src
          </Nav.Link>
        </Nav>
      </Navbar>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer className="text-center">
        © Ram's Musings {new Date().getFullYear()}
        {/*
        , Built with
        {` `}
        <a href="https://www.gatsbyjs.com" className="footer-link">
          Gatsby
        </a>
        */}
      </footer>
    </div>
  )
}

export default Layout
