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
let random;
let request;
let table;
const words = ["car","hello","animal","goodbye"];
app.command("/mark-1-dict", async ({command,ack,respond})=> {
  await ack();
  table = command.text.split(" ");
  if (table[0]==="-r"){
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${table[1]}`)
      await respond({ text:
        `${response.data[0].word}: ${response.data[0].meanings[0].definitions[0].definition} `
      });
    } catch (err) {
      await respond({ text: "Failed to fetch the word." });
    }
  } else if (command.text === "-R") {
      random = Math.floor(Math.random() * words.length);
      request = words[random];
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${request}`)
      await respond({ text:
        `${response.data[0].word}: ${response.data[0].meanings[0].definitions[0].definition} `
      });
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
      text:`You have dev for ${min} min`
    });
    startTime = null;
  }
});

const dict = {ls:'list files in the current directory',
  cd:'change the current directory',
pwd:'print the current corking directory',
ip:'show ip and network configurations',
hostname:'show or set the systems host name',
uname:'Print certain system information'};
app.command("/mark-1-linux",async({command,ack,respond}) => {
  await ack();
  if (command.text in dict) {
    await respond ({text:dict[command.text]});
  }
});

