const axios = require("axios");

require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});


app.command("/mark-1-joke", async ({ ack, respond }) => {
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

app.command("/mark-1-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/mark-1-help", async ({ command,ack, respond }) => {
  await ack();
  await respond({
    text:`Available Commands:
/mark-1-ping - Check bot latency
/mark-1-catfact - Get a cat fact
/mark-1-joke - Get a joke`
  });
});

app.command("/mark-1-catfact", async ({ ack, respond }) => {
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
})();


app.command("/mark-1",async({ack,respond}) =>{
  await ack();
  await respond({
    text:`Bonjour,Bonjour little guy, approach don't be scary.\nMy name is Mark-1 (catched the ref 👀),i'm here to... I don't even know why i was created for...\nDon't forget to discover other command maybe my father put something cool (or maybe not🤫)`
  });
});


let startTime = null;
app.command("/mark-1-time", async ({ command, ack, respond }) => {
  await ack();
  if (command.text === "start") {
    startTime = Date.now();
    await respond({text:`Your Chrono is started`});
  } else if (command.text === "stop") {
    const time = Date.now() - startTime;
    const min = Math.floor(time/60000);

    await respond({
      text:`You have dev for ${min}`
    });
    startTime = null;
  }
});