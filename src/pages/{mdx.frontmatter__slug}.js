import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { slugify } from '../utils/slugify'
import { pillRow, pill, categoryPill } from '../styles/pills.module.css'

const BlogPost = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.hero_image)
  const { category, tags } = data.mdx.frontmatter
  return (
          <Layout
            pageTitle={data.mdx.frontmatter.title}
            titleIcon={data.mdx.frontmatter.thumbnail?.svgContent}
            pageMeta={data.mdx.frontmatter.date}
          >
            {(category || (tags && tags.length > 0)) && (
              <div className={pillRow}>
                {category && (
                  <Link
                    to={`/category/${slugify(category)}/`}
                    className={categoryPill}
                  >
                    {category}
                  </Link>
                )}
                {tags && tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tags/${slugify(tag)}/`}
                    className={pill}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            <GatsbyImage
              image={image}
              alt={data.mdx.frontmatter.hero_image_alt}
            />
            <p>
              Photo Credit:{" "}
              <a href={data.mdx.frontmatter.hero_image_credit_link}>
                {data.mdx.frontmatter.hero_image_credit_text}
              </a>
            </p>
            {children}
          </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
        thumbnail {
          svgContent
        }
        category
        tags
      }
    }
  }
`


export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost