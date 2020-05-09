import React from 'react'
import Header from "../../components/header/header"
import PriceSplitter from "../../utils/priceFormat"
import PercentDiscount from "../../utils/percentDiscount"
import SEO from "../../components/seo"
import "./product.css"

export default ({ pageContext }) => (
  <main className={`product-page`}>
    <SEO title={ pageContext.acf.product_name } />
    <Header />
    <section className={`container`}>
      <div className={`row align-items-center justify-content-center`}>
        <div className={`col-sm-12 col-md-5`}>
          <span className={`flag flag-stock ${pageContext.acf.product_stock ? "show" : null }`}>{ pageContext.acf.product_stock > 0 ? `Disponible` : `Agotado` }</span>
          <span className={`flag flag-discount ${pageContext.acf.product_discount ? "show" : null } `} > { PercentDiscount(pageContext.acf.product_discount, pageContext.acf.product_price) }% OFF</span>
          <h1 className={`display-5 mt-2 product-name`}>{ pageContext.acf.product_name }</h1>
          <p className={`sku`}><strong>SKU</strong>: { pageContext.acf.product_sku}</p>
          <p className={`brand`}><strong>Marca</strong>: { pageContext.acf.product_brand.post_title}</p>
          <p className={`price`}>
            <strong>Precio</strong>: <span className={`price-num`}>${ pageContext.acf.product_discount > 0 ? PriceSplitter(pageContext.acf.product_discount) : PriceSplitter(pageContext.acf.product_price) }</span>
          </p>
        </div>
        <div className={`col-sm-12 col-md-5 col-image`}>
          <img src={ pageContext.acf.product_image !== null ? pageContext.acf.product_image.source_url : "image.png" } alt={ pageContext.title } />
        </div>
        <div className={`col-sm-12 col-md-10 mt-2`}>
          <button className="btn btn-danger">Agregar al carrito</button>
        </div>
      </div>
    </section>
  </main>
);