import * as React from "react"
import { Link, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "../style.css"
import "bootstrap/dist/css/bootstrap.min.css"

const BlogIndex = ({ data, location }) => {
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
      <Seo title="All posts" />
      <Container>
        <Row>
          <Col>
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug

                return (
                  <li key={post.fields.slug}>
                    <article
                      className="post-list-item"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <div className="d-flex flex-row align-items-stretch justify-content-start">
                        <h6 className="mr-5 text-right">
                          {post.frontmatter.date}
                        </h6>
                        <Link to={post.fields.slug} itemProp="url">
                          <h6
                            itemProp="headline flex-start"
                            className="article-titles"
                          >
                            {title}
                          </h6>
                        </Link>
                      </div>
                      {/*
                        <section>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post.frontmatter.description || post.excerpt,
                            }}
                            itemProp="description"
                          />
                        </section>
                      */}
                    </article>
                  </li>
                )
              })}
            </ol>
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
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
