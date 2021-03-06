import { keys } from 'lodash/fp';

export const MADALS_NAME = {
  authModal: 'authModal',
  registrationModal: 'registrationModal',
};

export const MADAL_BUTTONS = {
  accept: 'Принять',
  сancel: 'Отмена',
  signOut: 'Выйти',
  signIn: 'Войти',
  signUp: 'Регистрация',
  yes: 'Да',
  no: 'Нет',
};

export const MADALS_NAME_FOR_PROPTYPE = keys(MADALS_NAME);

export const MODAL_WIDTH = '350px';

export const HTML_TYPE = 'submit';
