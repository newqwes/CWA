import COLORS from './colors';

const background = {
  default: COLORS.veryDarkOrange,
  disabled: COLORS.transparentBlack,
  info: COLORS.softGray,
  inverted: COLORS.white,
  warning: COLORS.brightOrange,
};

const shadow = {
  default: COLORS.softGray,
  disabled: COLORS.transparentBlack,
  info: COLORS.softGray,
  inverted: COLORS.veryPale,
  warning: COLORS.softRedShadow,
};

const dark = {
  accent: COLORS.strongOrange,
  button: {
    background: {
      default: COLORS.darkModerateOrange,
      disabled: COLORS.transparentBlack,
      info: COLORS.veryPale,
      inverted: COLORS.veryDarkOrange,
      warning: COLORS.brownTone,
    },
    color: {
      default: COLORS.veryPale,
      disabled: COLORS.transparentBlack,
      info: COLORS.strongOrange,
      inverted: COLORS.veryPale,
      warning: COLORS.white,
    },
    border: {
      default: COLORS.darkModerateOrange,
      disabled: COLORS.transparentBlack,
      info: COLORS.darkishPurple,
      inverted: COLORS.veryDarkOrange,
      warning: COLORS.brownTone,
    },
  },

  label: {
    default: COLORS.veryDarkOrange,
    disabled: COLORS.softDarkGray,
    info: COLORS.lightGrayishCyan,
    inverted: COLORS.darkGrayishYellow,
    warning: COLORS.brightOrange,
  },

  link: {
    color: {
      default: COLORS.veryDarkOrange,
      inverted: COLORS.darkGrayishYellow,
      disabled: COLORS.transparentBlack,
      info: COLORS.veryPale,
      warning: COLORS.brightOrange,
    },
    hover: {
      default: COLORS.darkOrange,
      inverted: COLORS.veryPale,
      disabled: COLORS.transparentBlack,
      info: COLORS.veryPale,
      warning: COLORS.brightOrange,
    },
    focus: {
      default: COLORS.darkOrange,
      inverted: COLORS.veryPale,
      disabled: COLORS.transparentBlack,
      info: COLORS.veryPale,
      warning: COLORS.brightOrange,
    },
  },

  field: {
    border: {
      default: COLORS.lightGrayishBlue,
      inverted: COLORS.darkGrayishYellow,
      warning: COLORS.brightOrange,
      disabled: COLORS.transparentBlack,
      info: COLORS.darkishPurple,
    },
  },

  icon: {
    color: {
      default: COLORS.lightGrayishBlue,
      disabled: COLORS.softDarkGray,
      info: COLORS.brightOrange,
      inverted: COLORS.veryPale,
      warning: COLORS.brightOrange,
    },
    hover: {
      default: COLORS.darkOrange,
      inverted: COLORS.veryPale,
      disabled: COLORS.softDarkGray,
      info: COLORS.strongOrange,
      warning: COLORS.brightOrange,
    },
    focus: {
      default: COLORS.darkOrange,
      inverted: COLORS.veryPale,
      disabled: COLORS.transparentBlack,
      info: COLORS.darkishPurple,
      warning: COLORS.brightOrange,
    },
  },
  authentication: {
    background,
    shadow,
  },
  cart: {
    background,
    shadow,
  },
  navbar: {
    background,
    shadow,
  },
  order: {
    background,
    shadow,
  },
  profile: {
    background,
    shadow,
  },
  productPopup: {
    background,
    shadow,
  },
  footer: {
    background,
    shadow,
  },
  header: {
    background,
    shadow,
  },
};

export default dark;
