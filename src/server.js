const url = require('url')

const express = require('express')
const bodyParser = require('body-parser')
const geckoboard = require('geckoboard')(process.env.GECKOBOARD_API_KEY)

const Metrics = require('./metrics')

let metricWhitelist
if (process.env.METRIC_WHITELIST) metricWhitelist = process.env.METRIC_WHITELIST.split(',').map(s => s.trim())

const app = express()

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(bodyParser.json({ strict: false, limit: '10mb' }))
app.use((err, req, res, next) => {
  if (err) {
    console.error('Unable to parse', err.message)
    return res.status(500).json({ status: 'error' })
  }

  return next()
})

app.get('/', (req, res) => {
  res.render('index', {
    metrics: metricWhitelist || ['all Calibre metrics'],
    webhook_path: url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: 'webhook'
    })
  })
})

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

module.exports = app
