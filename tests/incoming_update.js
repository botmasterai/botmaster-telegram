import test from 'ava';
import Botmaster from 'botmaster';
import request from 'request-promise';
import config from './_config';

import TelegramBot from '../lib';

test.beforeEach((t) => {
  return new Promise((resolve) => {
    t.context.botmaster = new Botmaster();
    t.context.bot = new TelegramBot({
      credentials: config.telegramCredentials(),
      webhookEndpoint: 'webhook',
    });
    t.context.botmaster.addBot(t.context.bot);
    t.context.requestOptions = {
      method: 'POST',
      uri: 'http://localhost:3000/telegram/webhook',
      json: true,
      resolveWithFullResponse: true,
    };
    t.context.rawIncomingUpdate = {
      update_id: '466607164',
      message: {
        message_id: 1,
        from: {
          id: config.telegramUserId(),
          first_name: 'Biggie',
          last_name: 'Smalls',
        },
        chat: {
          id: config.telegramUserId(),
          first_name: 'Biggie',
          last_name: 'Smalls',
          type: 'private',
        },
        date: 1468325836,
      },
    };
    t.context.botmaster.on('listening', resolve);
  });
});

test.afterEach((t) => {
  return new Promise((resolve) => {
    t.context.botmaster.server.close(resolve);
  });
});

test('/webhook should respond with a 200 statusCode when doing a standard request', (t) => {
  t.plan(1);
  // an error will occur here as request is badly formatted. but we don't
  // care. So I eat the error up here.
  t.context.botmaster.on('error', () => {});

  return request(t.context.requestOptions)
  .then((res) => {
    t.is(res.statusCode, 200);
  });
});

test('/webhook should emit an error when update is badly formatted', (t) => {
  t.plan(1);
  // an error will occur here as request is badly formatted. but we don't
  // care. So I eat the error up here.
  t.context.botmaster.on('error', (bot, err) => {
    t.is(err.message, 'Error in __formatUpdate "Cannot read property ' +
     '\'from\' of undefined". Please report this.');
  });

  t.context.requestOptions.body = {};
  return request(t.context.requestOptions);
});

test('/webhook should emit an update wvent when the update is well formatted', (t) => {
  t.plan(1);

  t.context.botmaster.use({
    type: 'incoming',
    controller: (bot, update) => {
      t.deepEqual(update.raw, t.context.rawIncomingUpdate);
    },
  });

  t.context.requestOptions.body = t.context.rawIncomingUpdate;
  return request(t.context.requestOptions);
});
