const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()
const port = 3000
const songLength = 72 // in seconds

let currentPlaytime = 0

const timer = () => {
  if (currentPlaytime < songLength) currentPlaytime++
  else currentPlaytime = 0
}

setInterval(timer, 1000)

app.use(express.static("public"))

app.get("/api/play/time", (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ currentPlaytime, serverTime: Date.now() }))
})

app.get("/api/play", (req, res) => {
  var music = path.join("music", "buffy.mp3")
  var stat = fs.statSync(music)
  var range = req.headers.range
  var readStream

  if (range != undefined) {
    var parts = range.replace(/bytes=/, "").split("-")
    var partialStart = parts[0]
    var partialEnd = parts[1]

    if (isNaN(partialStart) || partialStart == "") {
      partialStart = "0"
    }

    if (isNaN(partialEnd) || partialEnd == "") {
      partialEnd = stat.size - 1
    }

    var start = parseInt(partialStart, 10)
    var end = parseInt(partialEnd, 10)
    var contentLength = end - start + 1

    console.log(
      `Streaming ${music} as ${contentLength} bytes from ${start} to ${end}`
    )

    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Length": contentLength,
      "Content-Range": "bytes=" + start + "-" + end + "/" + stat.size,
      "Accept-Ranges": "bytes",
    })

    readStream = fs.createReadStream(music, { start: start, end: end })
  } else {
    console.log(`Streaming ${music} as ${stat.size} bytes`)

    res.header({
      "Content-Type": "audio/mpeg",
      "Content-Length": stat.size,
    })

    readStream = fs.createReadStream(music)
  }

  readStream.pipe(res)

  console.log("Done")
})

app.listen(port, () => {
  console.log(`Xmas Lights Server at http://localhost:${port}`)
})
