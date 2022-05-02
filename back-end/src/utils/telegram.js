import { AUTH_TELEGRAM_CODE_REGEX } from '../constants/telegram';

export const isAuthCode = text => AUTH_TELEGRAM_CODE_REGEX.test(text);

export const removeAuthCode = text => text.replace(AUTH_TELEGRAM_CODE_REGEX, '');
