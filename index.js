require('dotenv').config()

const express = require('express')
const geckoboard = require('geckoboard')(process.env.GECKOBOARD_API_KEY)
const metricWhitelist = process.env.METRIC_WHITELIST.split(',')
const app = express()
const port = process.env.PORT || 3000

app.use(express.bodyParser())

app.post('/webhook', (req, res) => {
  metrics = new Metrics({ payload: req.body, metricWhitelist: metricWhitelist })

  metrics.datatables.map(dataset => {
    const { id, fields, values } = dataset

    geckoboard.datasets.findOrCreate({ id, fields }, (err, table) => {
      if (err) {
        console.error(err)
        return
      }

      table.post([values], {}, err => {
        if (err) {
          console.error(err)
          return
        }
      })
    })
  })

  res.status(200).json({ status: 'ok' })
})

app.listen(port)
