import { assoc } from 'lodash/fp';

const initialState = {};

const settings = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_SETTINGS_CAPACITY': {
      const { value, fieldName } = payload;

      return assoc(['capacity', fieldName], value, state);
    }

    default:
      return state;
  }
};

export default settings;
