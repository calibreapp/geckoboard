require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const geckoboard = require('geckoboard')(process.env.GECKOBOARD_API_KEY)

const Metrics = require('./src/metrics')

const metricWhitelist = process.env.METRIC_WHITELIST.split(',')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use((err, req, res, next) => {
  if (err) return console.error('Unable to parse', req.body)
  return next()
});

app.post('/webhook', (req, res) => {
  metrics = new Metrics({ payload: req.body, metricWhitelist: metricWhitelist })

  metrics.datatables.forEach(dataset => {
    const { id, fields, values } = dataset
    console.log('Updating datatable', id)

    geckoboard.datasets.findOrCreate({ id, fields }, (err, table) => {
      if (err) {
        console.error('findOrCreate', err)
        return
      }

      table.post(values, {}, err => {
        if (err) {
          console.error('post', err)
          return
        }
      })
    })
  })

  res.status(200).json({ status: 'ok' })
})

app.listen(port)
