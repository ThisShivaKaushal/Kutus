require("dotenv").config();
const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/kutus-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Finally you remembered! 
Here's my command, type something from these, and I will give you the answer:D` });
});

app.command("/kutus-info", async ({ command, ack, respond }) => {
    const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Hey, I was created by Shiva, a reckless coder. I think he’s a bit foolish too—who sits straight at a desk for 6 to 7 hours straight just typing away? When I brought this up to him, he told me to ask any other Hack Clubber. Now, I really don't get what he means by that.`})
});

app.command("/kutus-hqweather", async ({ ack, respond }) => {
await ack();

try {
  const response = await
  axios.get(
    "https://wttr.in/Shelburne,Vermont?format=j1"
  );

  const weather = response.data.current_condition[0];

  await respond({
    text: `🏠 *HackClub HQ Weather*\n\n`+
    `📍 *Shelburne, Vermont\n`+
    `🌡 ${weather.temp_C}°C\n` +
    `☁ ${weather.weatherDesc[0].value}\n` +
    `💧 Humidity: ${weather.humidity}%\n` +
    `💨 Wind: ${weather.windspeedkmph} km/h`
  });
} catch  (err) {
  console.error(err);
  await respond({
    text: "Sorry, I couldn't fetch the weather information:("
  });
}
});

app.command("/kutus-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

app.command("/kutus-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});


(async () => {
  await app.start();
  console.log("bot is running!");
})()