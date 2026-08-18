const fs = require("fs")
const { slugify } = require("./src/utils/slugify")

// Adds an `svgContent` field to File nodes, returning the raw file text
// so SVGs can be rendered inline (rather than as an <img src="...">).
// This lets the SVG inherit `currentColor` from CSS.
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    File: {
      svgContent: {
        type: "String",
        resolve(source) {
          if (source.extension !== "svg") {
            return null
          }
          return fs.readFileSync(source.absolutePath, "utf-8")
        },
      },
    },
  })
}

// Pin the type of category/tags explicitly, so posts that omit one of
// these fields don't cause Gatsby's type inference to guess wrong.
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      category: String
      tags: [String]
    }
  `)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            category
            tags
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX posts for category/tag pages", result.errors)
    return
  }

  const categoryTemplate = require.resolve("./src/templates/category.js")
  const tagTemplate = require.resolve("./src/templates/tag.js")

  const categories = new Set()
  const tags = new Set()

  result.data.allMdx.nodes.forEach((node) => {
    if (node.frontmatter.category) {
      categories.add(node.frontmatter.category)
    }
    ;(node.frontmatter.tags || []).forEach((tag) => tags.add(tag))
  })

  categories.forEach((category) => {
    createPage({
      path: `/category/${slugify(category)}/`,
      component: categoryTemplate,
      context: { category },
    })
  })

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${slugify(tag)}/`,
      component: tagTemplate,
      context: { tag },
    })
  })
}