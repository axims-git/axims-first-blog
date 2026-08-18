import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { postList, postArticle, postIcon, postText, postTitle, postDate } from '../styles/post-list.module.css'

const TagPage = ({ pageContext, data }) => {
  const { tag } = pageContext
  return (
    <Layout pageTitle={`Tag: #${tag}`}>
      <div className={postList}>
      {
        data.allMdx.nodes.map((node) => (
          <article key={node.id} className={postArticle}>
            {node.frontmatter.thumbnail && (
              <span
                className={postIcon}
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
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($tag: String) {
    allMdx(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
          thumbnail {
            svgContent
          }
        }
        id
      }
    }
  }
`

export const Head = ({ pageContext }) => (
  <Seo title={`Tag: #${pageContext.tag}`} />
)

export default TagPage