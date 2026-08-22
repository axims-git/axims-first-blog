/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `axims.id.au`,
    description: `A blog about whatever Axims feels like writing about.`,
    siteUrl: `https://axims.id.au`,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        mdxOptions: {
          remarkPlugins: [require("remark-gfm").default],
          rehypePlugins: [
            [
              require("rehype-prism-plus").default,
              {
                // Don't error on languages we haven't installed a
                // grammar for — falls back to plain, unhighlighted text.
                ignoreMissing: true,
              },
            ],
          ],
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map((node) => {
                return {
                  title: node.frontmatter.title,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + "/" + node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + "/" + node.frontmatter.slug,
                  custom_elements: [{ "content:encoded": node.excerpt }],
                }
              })
            },
            query: `
              {
                allMdx(sort: { frontmatter: { date: DESC } }) {
                  nodes {
                    excerpt
                    frontmatter {
                      title
                      date(formatString: "MMMM D, YYYY")
                      slug
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "axims.id.au RSS Feed",
          },
        ],
      },
    },
  ],
};