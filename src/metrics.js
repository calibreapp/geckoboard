const moment = require('moment')
const slugify = require('slug')
const { TextEncoder } = require('util')

slugify.defaults.mode = 'rfc3986'
slugify.defaults.modes.rfc3986.charmap['_'] = '-'

const utf8StringTruncate = (string, charLimit) => {
  let stringArr = string.split('')
  const encoder = new TextEncoder()
  let truncated = ''

  while (
    encoder.encode(truncated).length + encoder.encode(stringArr[0]).length <
      charLimit + 1 &&
    stringArr.length
  ) {
    truncated += stringArr.shift()
  }

  return truncated
}

module.exports = class Metrics {
  constructor(params = {}) {
    this.payload = params.payload
    this.metricWhitelist = params.metricWhitelist
  }

  get datatables() {
    let table = new Map()

    const site = this.payload.site_id

    this.payload.pages.forEach(page => {
      page.metrics.map(metric => {
        const metricName = slugify(metric.name)
        const id = `calibre.${metricName}`

        // Skip metrics that we aren't interested in
        if (this.metricWhitelist && !this.metricWhitelist.includes(metricName))
          return

        let values = table.has(id) ? table.get(id).values : []

        values.push({
          site: utf8StringTruncate(site, 100),
          profile: utf8StringTruncate(page.profile, 100),
          page: utf8StringTruncate(page.name, 100),
          url: utf8StringTruncate(page.endpoint, 100),
          value: metric.value,
          timestamp: moment(this.payload.created_at)
            .utc()
            .format()
        })

        table.set(id, {
          id,
          values,
          fields: {
            site: { type: 'string', name: 'Site name' },
            profile: { type: 'string', name: 'Device profile' },
            page: { type: 'string', name: 'Page name' },
            url: { type: 'string', name: 'URL' },
            value: { type: 'number', name: 'Value' },
            timestamp: { type: 'datetime', name: 'Time' }
          }
        })
      })
    })

    return table
  }
}
