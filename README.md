# Calibre Metrics on a Geckoboard Dashboard 📈

**Getting started**

* Get your [Geckoboard API key](https://app.geckoboard.com/account)
* [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/calibreapp/geckoboard)
* Copy the `webhook URL` from the app that you just deployed to heroku (`<your-deployed-app>.herokuapp.com`)
* For each site that you want to report metrics from, create a new webhook (Calibre→Site→Settings→Integrations) and paste in the `webhook URL`



## Settings

* **GECKOBOARD_API_KEY** - The API key from your Geckoboard account
* **METRIC_WHITELIST** - `visually-complete,oncontentload` (Full list available below). Leaving this blank will result in *all* metrics being delivered to geckoboard.


## Metrics Calibre outputs

As of writing, Calibre outputs the following metrics. From time to time, new metrics will become available and this list will be updated.

* `console-warnings`
* `speed-index`
* `visually-complete`
* `firstrender`
* `lighthouse-best-practices-score`
* `lighthouse-accessibility-score`
* `lighthouse-performance-score`
* `lighthouse-pwa-score`
* `first-contentful-paint`
* `first-meaningful-paint`
* `dom-size`
* `estimated-input-latency`
* `first-interactive`
* `json-size-in-bytes`
* `image-size-in-bytes`
* `font-size-in-bytes`
* `js-size-in-bytes`
* `css-size-in-bytes`
* `html-size-in-bytes`
* `page-wait-timing`
* `page-size-in-bytes`
* `asset-count`
* `onload`
* `oncontentload`
