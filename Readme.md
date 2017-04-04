# Botmaster-telegram

[![Build Status](https://travis-ci.org/botmasterai/botmaster-telegram.svg?branch=master)](https://travis-ci.org/botmasterai/botmaster-telegram)
<!--[![Coverage Status](https://coveralls.io/repos/github/botmasterai/botmaster-telegram/badge.svg?branch=master)](https://coveralls.io/github/botmasterai/botmaster-telegram?branch=master)-->
[![npm-version](https://img.shields.io/npm/v/botmaster-telegram.svg)](https://www.npmjs.com/package/botmaster-telegram)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](LICENSE)

This is the Telegram integration for botmaster. It allows you to use your 
botmaster bot on Telegram.

This package works with botmaster v3;
---

Botmaster is a lightweight chatbot framework. Its purpose is to integrate your existing chatbot into a variety of messaging channels.

## Documentation

Find the whole documentation for the framework on: http://botmasterai.com/documentation.latest

## Installing

```bash
yarn add botmaster-telegram
```

or

```bash
npm install --save botmaster-telegram
```

## Credentials

All you need here is an authToken. In order to get one, you will need to either create a new bot on telegram.

Basically, you'll need to send a `/newbot` command(message) to Botfather (go talk to him [here](https://web.telegram.org/#/im?p=@BotFather)). Once you're done with giving it a name and a username, BotFather will come back to you with your authToken. Make sure to store it somewhere. More info on BotFather can be found [here](https://core.telegram.org/bots#create-a-new-bot ) if needed.

For more on Telegram, you can find the telegram api docs [here](https://core.telegram.org/bots/api)

## Webhooks

Setting up your webhook requires you to make the following request outside of Botmaster (using curl for instance or a browser):


```http
https://api.telegram.org/bot<authToken>/setWebhook?url=<'Your Base URL'>/telegram/webhook1234
```

>Because Telegram doesn't send any type of information to verify the identity of the origin of the update, it is highly recommended that you include a sort of hash in your webhookEndpoint. I.e., rather than having this: `webhookEndpoint: '/webhook/'`, do something more like this: `webhookEndpoint: '/webhook92ywrnc9qm4qoiuthecvasdf42FG/'`. This will assure that you know where the request is coming from.


>If you are not too sure how webhooks work and/or how to get them to run locally, go to [webhooks](/getting-started/webhooks) to read some more.

## Code

```js
const Botmaster = require('botmaster');
const botmaster = new Botmaster();

const telegramSettings = {
  credentials: {
    authToken: 'YOUR authToken',
  },
  webhookEndpoint: '/webhook1234/',
};

const telegramBot = new Botmaster.botTypes.TelegramBot(telegramSettings);
botmaster.addBot(telegramBot);

botmaster.use({
  type: 'incoming',
  name: 'my-middleware',
  controller: (bot, update) => {
    return bot.reply(update, 'Hello world!');
  }
});
```

#### Note on attachment types and conversions

Attachment type conversion works as such for __Telegram__:

| Telegram Type | Botmaster conversion
|--- |---
| audio | audio
| voice  | audio
| photo  | image
| video  | video
| location  | location
| venue  | location

`contact` attachment types aren't supported in Messenger. So in order to deal with them in Botmaster, you will have to look into your `update.raw` object which is the standard Telegram update. You will find your contact object in `update.raw.contact`.

Also, concerning `location` and `venue` attachments. The url received in Botmaster for Telegram is a google maps one with the coordinates as query parameters. It looks something like this: `https://maps.google.com/?q=<lat>,<long>`

A few of you will want to use attachments with your `socket.io` bots. Because the Botmaster message standard is the Facebook Messenger one, everything is URL based. Which means it is left to the developer to store both incoming and outgoing attachments.

## License

This library is licensed under the MIT [license](LICENSE)
