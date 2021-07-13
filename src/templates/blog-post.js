import * as React from "react"
import { Link, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"
import rehypeReact from "rehype-react"
import Vega, { KEY as VegaKey } from "gatsby-remark-vega/dist/client"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    [VegaKey]: Vega,
  },
}).Compiler

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Container
        fluid
        style={{
          backgroundImage: `url(${post.frontmatter.img})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "60vh",
          marginBottom: "4rem",
        }}
      />
      <Container>
        <Row>
          <Col>
            <article
              className="blog-post"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header>
                <h1 itemProp="headline">{post.frontmatter.title}</h1>
                <p className="blue-color">{post.frontmatter.date}</p>
              </header>
              <section
                dangerouslySetInnerHTML={{ __html: post.html }}
                itemProp="articleBody"
              />
              {/*
              <div itemProp="articleBody">{renderAst(post.htmlAst)}</div>
              */}
              <hr />
            </article>
            <nav className="blog-post-nav">
              <ul
                style={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                  listStyle: `none`,
                  padding: 0,
                }}
              >
                <li>
                  {previous && (
                    <Link
                      to={previous.fields.slug}
                      rel="prev"
                      className="blue-color"
                    >
                      ← {previous.frontmatter.title}
                    </Link>
                  )}
                </li>
                <li>
                  {next && (
                    <Link
                      to={next.fields.slug}
                      rel="next"
                      className="blue-color"
                    >
                      {next.frontmatter.title} →
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        img
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
