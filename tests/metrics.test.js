const exampleData = require('./webhook-body.json')
import Metrics from '../src/metrics'

test('returns the datatables', () => {
  const metrics = new Metrics({
    payload: exampleData,
    metricWhitelist: ['visually-complete', 'speed-index']
  })

  expect(metrics.datatables.size).toBe(2)
  expect(metrics.datatables.get("calibre.visually-complete").values.length).toBe(2)
  expect(metrics.datatables.has("calibre.visually-complete")).toBe(true)
  expect(metrics.datatables.has("calibre.speed-index")).toBe(true)

  expect(metrics.datatables.get("calibre.visually-complete")).toEqual({
    "id": "calibre.visually-complete",
    "fields": {
      "page": {
        "name": "Page name",
        "type": "string",
      },
      "profile": {
        "name": "Device profile",
        "type": "string",
      },
      "site": {
        "name": "Site name",
        "type": "string",
      },
      "timestamp": {
        "name": "Time",
        "type": "datetime",
      },
      "url": {
        "name": "URL",
        "type": "string",
      },
      "value": {
        "name": "Value",
        "type": "number",
      },
    },
    "values": [
      {
        "page": "Home",
        "profile": "Chrome Desktop",
        "site": "ryanair",
        "timestamp": "2017-06-13T02:26:45Z",
        "url": "https://www.ryanair.com/gb/en/",
        "value": 19493
      },
      {
        "page": "Home",
        "profile": "iPhone 6, 3G connection",
        "site": "ryanair",
        "timestamp": "2017-06-13T02:26:45Z",
        "url": "https://www.ryanair.com/gb/en/",
        "value": 15161
      }
    ]
  })
})
