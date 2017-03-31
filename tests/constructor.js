import test from 'ava';

import TelegramBot from '../lib';
import config from './_config';

test('verify that settings are correctly set after default instantiation', (t) => {
  t.plan(10);

  const credentials = config.telegramCredentials();
  const bot = new TelegramBot({
    credentials,
    webhookEndpoint: 'webhook',
  });

  t.is(bot.type, 'telegram');
  t.is(bot.requiresWebhook, true);
  t.is(bot.webhookEndpoint, 'webhook');
  t.deepEqual(bot.requiredCredentials, ['authToken']);
  t.deepEqual(bot.receives, {
    text: true,
    attachment: {
      audio: true,
      file: true,
      image: true,
      video: true,
      location: true,
      fallback: false,
    },
    echo: false,
    read: false,
    delivery: false,
    postback: false,
    quickReply: false,
  });
  t.deepEqual(bot.sends, {
    text: true,
    quickReply: true,
    locationQuickReply: false,
    senderAction: {
      typingOn: true,
      typingOff: false,
      markSeen: false,
    },
    attachment: {
      audio: true,
      file: true,
      image: true,
      video: true,
    },
  });
  t.is(bot.retrievesUserInfo, false);
  t.is(bot.baseUrl, `https://api.telegram.org/bot${credentials.authToken}`);
  t.is(bot.baseFileUrl, `https://api.telegram.org/file/bot${credentials.authToken}`);  
  t.is(bot.id, config.telegramBotId());
});
