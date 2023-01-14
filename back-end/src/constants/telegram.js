export const AUTH_TELEGRAM_CODE_REGEX = /^thcd/;

export const MESSAGE_OPTIONS = {
  parse_mode: 'markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: [['🔄🔄🔄', '⏰⏰⏰', '⏰⏰']]
  }
};

export const AGAIN_MESSAGE_OPTIONS = {
  parse_mode: 'markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      ['0.05', '0.1', '0.5', '1'],
      ['2', '5', '10', '20'],
      ['30', '50', '100', '200']
    ]
  }
};

export const MINUTE = 1000 * 60;
export const TEN_MINUTE = MINUTE * 10;
export const TELEGRAM_MESSAGE_MAX_LIMIT = 4096;
