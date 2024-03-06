export const AUTH_TELEGRAM_CODE_REGEX = /^thcd/;

export const REFRESH_BTN = '🔄🔄🔄';
export const DAILY_UPDATES_BTN = '⏰2️⃣4️⃣';
export const NOTIFY_CHANGES_BTN = '⏰🚀';
export const NOTIFY_BUY_SELL_BTN = '🔔📈📉';

export const MESSAGE_OPTIONS = {
  parse_mode: 'markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      [REFRESH_BTN, NOTIFY_CHANGES_BTN],
      [DAILY_UPDATES_BTN, NOTIFY_BUY_SELL_BTN],
    ],
  },
};

export const AGAIN_MESSAGE_OPTIONS = {
  parse_mode: 'markdown',
  reply_markup: {
    resize_keyboard: true,
    keyboard: [
      ['0.05', '0.1', '0.5', '1'],
      ['2', '5', '10', '20'],
      ['30', '50', '100', '200'],
    ],
  },
};

export const MINUTE = 1000 * 60;
export const TEN_MINUTE = MINUTE * 10;
export const TELEGRAM_MESSAGE_MAX_LIMIT = 4096;
