const moment = require('moment')
const slugify = require('slug')
slugify.defaults.mode = 'rfc3986'
slugify.defaults.modes.rfc3986.charmap['_'] = '-'

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
        if (!this.metricWhitelist.includes(metricName)) return

        let values = table.has(id) ? table.get(id).values : []

        values.push({
          site: site.substring(0, 100),
          profile: page.profile.substring(0, 100),
          page: page.name.substring(0, 100),
          url: page.endpoint.substring(0, 100),
          value: metric.value,
          timestamp: moment(this.payload.created_at).utc().format()
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
