const exampleData = require('./webhook-body.json')
import Metrics from '../src/metrics'

test('returns the datatables', () => {
  const metrics = new Metrics({
    payload: exampleData,
    metricWhitelist: ['visually-complete']
  })

  expect(metrics.datatables.length).toBe(2)
  expect(metrics.datatables[0]).toEqual({
    "id": "calibre.ryanair.visually-complete",
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
    "values": {
      "page": "home",
      "profile": "chrome-desktop",
      "site": "ryanair",
      "timestamp": "2017-06-13T02:26:45Z",
      "url": "https://www.ryanair.com/gb/en/",
      "value": 19493
    }
  })
})
