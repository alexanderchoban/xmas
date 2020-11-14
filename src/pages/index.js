import React from "react"
import { Link } from "gatsby"
import Player from "../components/player"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Merry Xmas!</h1>
    <Player />
    <Link to="/about">About this App</Link>
  </Layout>
)

export default IndexPage
