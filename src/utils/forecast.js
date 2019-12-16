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
      const { summary } = body.daily.data[0]
      callback(undefined, `${summary} It is currently degrees ${temperature} out. There is a ${precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast;