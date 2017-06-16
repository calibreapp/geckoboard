# Calibre Metrics on a Geckoboard Dashboard 📈
[![Calibre metrics on a Geckoboard preview](dashboard-preview.png)](https://youtu.be/6GsDtYFeUdA)

## [🏫 Watch the video tutorial to set this up](https://youtu.be/6GsDtYFeUdA)

**Getting started**

* Get your [Geckoboard API key](https://app.geckoboard.com/account)
* [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/calibreapp/geckoboard)
* Visit the url of the heroku app you just deployed to find the webhook url (`<your-deployed-app>.herokuapp.com/webhook`)
* For each site that you want to report metrics from, create a new webhook (Calibre→Site→Settings→Integrations) and paste in the `webhook URL`

## Settings

* **GECKOBOARD_API_KEY** - The API key from your Geckoboard account
* **METRIC_WHITELIST** - `visually-complete,oncontentload` (Full list available below). Not setting this will result in *all* metrics being delivered to geckoboard.


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
* `consistently-interactive`
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

## Troubleshooting

If you’ve set everything up, run some snapshots and there appears to be no new Calibre datasets in your Geckoboard account, try running `heroku logs --tail --app YOUR_APP_NAME_HERE` to get a log from the deployed application.

If you think you’ve discovered a bug, issue or have ideas for how to improve calibre-geckoboard, please file an issue or raise a PR. (ps, We’ll send stickers and eternal 👏 for PRs)
