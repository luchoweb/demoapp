import React from 'react'
import Header from "../components/header"

export default ({ pageContext }) => (
  <main>
    <Header siteTitle="DomiApp" />
    <section className="container">
      <h1>
        { pageContext.acf.product_name }
      </h1>
      <p>SKU: { pageContext.acf.product_sku}</p>
      <img src={ pageContext.acf.product_image } alt={ pageContext.title } />
    </section>
  </main>
);