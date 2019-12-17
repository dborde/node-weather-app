const request = require('request')
const forecast = (longitude, latitude, callback) => {
  const url = `https://api.darksky.net/forecast/3fa13b849e0359902165ef0d437a43fe/${latitude},${longitude}`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      const { temperature, precipProbability } = body.currently
      const { summary, temperatureHigh, temperatureLow, windSpeed, windGust  } = body.daily.data[0]
      callback(undefined, `${summary} The temperature is currently ${parseInt(temperature)} degrees with a high of ${parseInt(temperatureHigh)}
      and a low of ${parseInt(temperatureLow)}.
      There is a ${parseInt(precipProbability)}% chance of rain. Winds are at ${parseInt(windSpeed)} mph with gusts up to ${parseInt(windGust)} mph.`)
    }
  })
}

module.exports = forecast;