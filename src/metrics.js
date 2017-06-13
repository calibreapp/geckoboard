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
    let data = []

    const site = this.payload.site_id

    this.payload.pages.map(page => {
      const slug = page.id
      const profile = slugify(page.profile)

      page.metrics.map(metric => {
        const metricName = slugify(metric.name)
        const id = `calibre.${site}.${metricName}`

        if (!this.metricWhitelist.includes(metricName)) return

        data.push({
          id: id,
          fields: {
            site: { type: 'string', name: 'Site name' },
            profile: { type: 'string', name: 'Device profile' },
            page: { type: 'string', name: 'Page name' },
            url: { type: 'string', name: 'URL' },
            value: { type: 'number', name: 'Value' },
            timestamp: { type: 'datetime', name: 'Time' }
          },
          values: {
            site: site,
            profile: profile,
            page: slug,
            url: page.endpoint,
            value: metric.value,
            timestamp: moment(this.payload.created_at).utc().format()
          }
        })
      })
    })

    return data
  }
}
