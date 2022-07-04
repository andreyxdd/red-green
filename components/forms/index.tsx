export const CONSTANTS = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 50,
  MAX_AGE: 100,
  MIN_AGE: 18,
  HEIGHT: {
    FT: { MIN: 2, MAX: 7, IN: 11 },
    CM: { MIN: 80, MAX: 230, AVG: 165 },
  },
  WEIGHT: {
    LBS: { MIN: 85, MAX: 320 },
    KG: {
      MIN: 40, MAX: 150, DECIMAL: 10, AVG: 61.7,
    },
  },
  MAX_PLAN_LENGTH: 70,
  MIN_PLAN_LENGTH: 14,
};

export const REGEX = {
  EMAIL: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  NAME: /^[a-z ,.'-]+$/i,
  HEIGHT: { FT: /^\d*\.?\d{2}$/, CM: /^[1-9]\d+$/ },
  WEIGHT: { LBS: /^\d+$/, KG: /^\d*\.?\d{1}$/ },
};

export const ERROR_MESSAGES = {
  UNEQUAL_EMAILS: 'Invalid value: emails are not the same',
  REQUIRED: 'This field is required',
  TERMS: 'Terms must be accepted to continue',
  EMAIL: 'Invalid value: provided email does not follow conventions - example@mail.com',
  NAME: 'Invalid name: "@", "!", "$", and other special charachters are not allowed',
  PASSWORD: 'Password must have at least 6 characters',
  NAME_LENGTH: `Maximum allowed length is ${CONSTANTS.NAME_MIN_LENGTH}`,
  INVALID_HEIGHT: {
    FT: 'Invalid value: number before dot is FT, after - IN. The letter characters are not allowed',
    CM: 'Invalid value: decimal part and letter characters are not allowed.',
  },
  INVALID_WEIGHT: {
    KG: 'Invalid value: letter characters are not allowed and only one decimal after dot can be input',
    LBS: 'Invalid value: decimal part and letter characters are not allowed',
  },
  INVALID_HEIGHT_RANGE: {
    FT: `Invalid value: height should be between ${CONSTANTS.HEIGHT.FT.MIN} and ${CONSTANTS.HEIGHT.FT.MAX} ft`,
    CM: `Invalid value: height should be between ${CONSTANTS.HEIGHT.CM.MIN} and ${CONSTANTS.HEIGHT.CM.MAX} cm`,
  },
  INVALID_WEIGHT_RANGE: {
    LBS: `Invalid value: weight should be between ${CONSTANTS.WEIGHT.LBS.MIN} and ${CONSTANTS.WEIGHT.LBS.MAX} lbs`,
    KG: `Invalid value: weight should be between ${CONSTANTS.WEIGHT.KG.MIN} and ${CONSTANTS.WEIGHT.KG.MAX} kg`,
  },
  MAINTENANCE_GOAL_WEIGHT: "The goal weight can not be more than 2% different the current user's weight",
  LOSING_GOAL_WEIGHT: "The goal weight can not be more or equal than the current user's weight",
};
