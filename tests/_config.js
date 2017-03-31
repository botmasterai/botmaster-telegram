'use strict';

const config = {
  telegramCredentials: () => ({
    authToken: '192123695:AAGatxXA4YUdMa_o5Ut0QJpcm4e1VLp8Idk',
  }),

  telegramUserId: () => '134449875', // who to send messages to in tests (that's me...)
  telegramBotId: () => '192123695',
};

module.exports = config;
