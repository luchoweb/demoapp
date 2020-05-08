const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local WordPress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    // ==== PAGES (WORDPRESS NATIVE) ====
    graphql(
      `
        {
          allWordpressPage {
            edges {
              node {
                id
                slug
                status
                template
                title
                content
                template
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create Page pages.
        const pageTemplate = path.resolve("./src/templates/page.js")
        _.each(result.data.allWordpressPage.edges, edge => {
          createPage({
            path: `/${edge.node.slug}/`,
            component: slash(pageTemplate),
            context: edge.node,
          })
        })
      })
      // ==== END PAGES ====

      // ==== POSTS (WORDPRESS NATIVE AND ACF) ====
      .then(() => {
        graphql(
          `
            {
              allWordpressAcfProducts {
                edges {
                  node {
                    acf {
                      product_name
                      product_sku
                      product_image
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
          const productTemplate = path.resolve("./src/templates/product.js")
          _.each(result.data.allWordpressAcfProducts.edges, edge => {
            createPage({
              path: `/producto/${edge.node.acf.product_name.replace(' ', '-')}/`,
              component: slash(productTemplate),
              context: edge.node,
            })
          })
          resolve()
        })
      })
    // ==== END POSTS ====
  })
}