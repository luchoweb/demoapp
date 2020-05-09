import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

export default ({ pageContext }) => (
  <main className={`container`}>
    <h1>
      { pageContext.title }
    </h1>
  </main>
);