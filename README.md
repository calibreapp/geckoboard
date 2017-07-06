# Calibre Metrics on a Geckoboard Dashboard 📈
[![Calibre metrics on a Geckoboard preview](dashboard-preview.png)](https://youtu.be/6GsDtYFeUdA)

## [📚 Follow the step by step setup guide](#step-by-step-walk-through)
## [🏫 Watch the 1:30 video step by step setup guide](https://youtu.be/6GsDtYFeUdA)

### Tldr; setup guide

* Get your [Geckoboard API key](https://app.geckoboard.com/account)
* Deploy this app to Heroku [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/calibreapp/geckoboard)
* Visit the url of the heroku app you just deployed to find the webhook url (`<your-deployed-app>.herokuapp.com/webhook`)
* For each site that you want to report metrics from, create a new webhook (Calibre→Site→Settings→Integrations) and paste in the `webhook URL`

### Settings

* **GECKOBOARD_API_KEY** - The API key from your Geckoboard account
* **METRIC_WHITELIST** - `visually-complete,oncontentload` (Full list available below). Not setting this will result in *all* metrics being delivered to geckoboard.

---

### Metrics Calibre outputs

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

## Step by step walk through

All the links and reference that you need are available at the top of this README. 

![2](https://user-images.githubusercontent.com/924/27894419-562e0428-624f-11e7-8c52-5da90a295176.png)

Visit the [Geckoboard account details](https://app.geckoboard.com/account) page, copy your API Key. 

Click this deploy button: 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/calibreapp/geckoboard)

Name the application, something like `yourcompany-calibre-geckoboard`. 

![3](https://user-images.githubusercontent.com/924/27894368-00afc522-624f-11e7-9928-45652668bc2a.png)

Paste in your Geckoboard API Key.

![4](https://user-images.githubusercontent.com/924/27894374-00e49e14-624f-11e7-836c-97b950a01625.png)
![5](https://user-images.githubusercontent.com/924/27894429-5e678466-624f-11e7-8da6-f9b852836783.png)

**Optional step** - Add a comma separated list of metrics that you’d like sent to Geckoboard. (Leaving this blank means that Calibre will deliver ALL of the metrics that it records to Geckoboard)


![6](https://user-images.githubusercontent.com/924/27894375-00fc8bdc-624f-11e7-9b8f-d85e11368e6f.png)

Click Deploy. 

Once the app has been deployed, click the view button.

![7](https://user-images.githubusercontent.com/924/27894377-01010e6e-624f-11e7-9652-9e5c02f58ec3.png)

Copy the '/webhook' URL.

![8](https://user-images.githubusercontent.com/924/27894376-00ff0e66-624f-11e7-8db8-f27096a5b900.png)

Go to your Calibre account.

For each site that you want to report metrics from, create a new webhook (Calibre → Site → Settings → Integrations) and paste in the `webhook URL`

![9](https://user-images.githubusercontent.com/924/27894367-0074fb0e-624f-11e7-9882-8c548f16373f.png)

Check "Snapshot", and save the notification.

![11](https://user-images.githubusercontent.com/924/27894373-00d7f70e-624f-11e7-8afc-058fcb76a60c.png)

At the end of every snapshot Calibre will send the collected metrics to this app using the webhook you just set up. This app will format those metrics for Geckoboard and send it using the Geckoboard API key.

Once a snapshot has been completed, visit your Geckoboard account and click 'Add widget'.

![12](https://user-images.githubusercontent.com/924/27894369-00cf08ba-624f-11e7-897f-d6b78e1cdf0d.png)

Choose 'datasets' as the source. You should now see Calibre metrics 👍

![13](https://user-images.githubusercontent.com/924/27894371-00d0501c-624f-11e7-8cd1-d213cf049d07.png)

For timeseries charts, it can be valuable to 'split' metrics by 'Device profile'. In the screenshot example below, you’ll notice that we have two profiles "Chrome Desktop" and "iPhone 6, 3G connection".

![14](https://user-images.githubusercontent.com/924/27894372-00d382c8-624f-11e7-9f84-e385a1c741ee.png)

You did it! Great work. 🏆

## Troubleshooting

If you’ve set everything up, run some snapshots and there appears to be no new Calibre datasets in your Geckoboard account, try running `heroku logs --tail --app YOUR_APP_NAME_HERE` to get a log from the deployed application.

If you think you’ve discovered a bug, issue or have ideas for how to improve calibre-geckoboard, please file an issue or raise a PR. (ps, We’ll send stickers and eternal 👏 for PRs)
