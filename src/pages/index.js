import * as React from "react"
import { Link, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "../style.css"
import "bootstrap/dist/css/bootstrap.min.css"

const BlogIndex = ({ data, location }) => {
  //const [showDesc, setShowDesc] = React.useState(false)
  //const [showImg, setShowImg] = React.useState(false)

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Ram's Musings | All Posts" />
      <Container>
        <Row className="article-sect">
          <Col>
            {/*
            <Nav variant="pills" defaultActiveKey="/home" className="mb-5">
              <Nav.Item id="desc">
                <Nav.Link
                  onClick={() => {
                    const elem = document.getElementById("desc")

                    if (showDesc === false) {
                      setShowDesc(true)
                      elem.style.background = "#d4d4d450"
                    } else {
                      setShowDesc(false)
                      elem.style.background = "#fff"
                    }
                  }}
                >
                  View Descriptions
                </Nav.Link>
              </Nav.Item>
              <Nav.Item id="imgs">
                <Nav.Link
                  onClick={() => {
                    const elem2 = document.getElementById("imgs")

                    if (showImg === false) {
                      setShowImg(true)
                      elem2.style.background = "#d4d4d450"
                    } else {
                      setShowImg(false)
                      elem2.style.background = "#fff"
                    }
                  }}
                >
                  View Images
                </Nav.Link>
              </Nav.Item>
            </Nav>
                */}

            <ul style={{ listStyle: `none` }} className="jsx-2008102337">
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug
                //const desc = post.frontmatter.description || post.excerpt
                //const img = post.frontmatter.img

                return (
                  <li key={post.fields.slug} className="jsx-2008102337">
                    <span className="jsx-2008102337">
                      {post.frontmatter.date}
                    </span>
                    <Link
                      to={post.fields.slug}
                      itemProp="url"
                      className="article-titles jsx-2008102337"
                    >
                      {title}
                    </Link>
                    {/*
                    <div>{renderAst(post.htmlAst)}</div>
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <Image
                          src={showImg ? img : null}
                          fluid
                          className="mb-5"
                          style={{ width: "20vw" }}
                        />
                      </div>
                      <p>{showDesc ? desc : null}</p>

                      <section>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post.frontmatter.description || post.excerpt,
                            }}
                            itemProp="description"
                          />
                        </section>
                      */}
                  </li>
                )
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        htmlAst
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          img
        }
      }
    }
  }
`
