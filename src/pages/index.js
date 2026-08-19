// Step 1: Import React
import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { postArticle, postIcon, postText, postTitle, postDate } from '../styles/post-list.module.css'

// Step 2: Define your component
const IndexPage = ({ data }) => {
  return (
    <Layout pageTitle="Blog">
      <p>I'm an engineer passionate about open-source solutions, homelab and applying engineering design considerations when managing our home.</p>
      {
        data.allMdx.nodes.map((node) => (
          <article key={node.id} className={postArticle}>
            {node.frontmatter.thumbnail && (
              <span
                className={postIcon}
                style={node.frontmatter.icon_color ? { '--icon-color': node.frontmatter.icon_color } : undefined}
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.thumbnail.svgContent,
                }}
              />
            )}
            <div className={postText}>
              <h2 className={postTitle}>
                <Link to={`/${node.frontmatter.slug}`}>
                  {node.frontmatter.title}
                </Link>
              </h2>
              <p className={postDate}>{node.frontmatter.date}</p>
            </div>
          </article>
        ))
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC }}) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
          thumbnail {
            svgContent
          }
          icon_color
        }
        id
      }
    }
  }
`

// You'll learn about this in the next task, just copy it for now
export const Head = () => <Seo title="Blog" />

// Step 3: Export your component
export default IndexPage