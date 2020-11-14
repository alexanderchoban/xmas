import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Merry Xmas!</h1>
        <p>use the controls below to play music that syncs with the light show.</p>
        <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>

        <p id="status">Click below to play</p>
        <div id="musicContainer"><audio id="music" /></div>
        
        <button class="btn btn-success btn-lg" id="play-btn" disabled onclick="syncAudio()">Loading...</button>
        <button class="btn btn-danger btn-lg" id="stop-btn" disabled onclick="stop()">Stop</button>
  </Layout>
)

export default IndexPage
