export const CONSTANTS = {
  PASSWORD: { MIN_LENGTH: 6, MAX_LENGTH: 32 },
  NAME: { MIN_LENGTH: 3, MAX_LENGTH: 50 },
  AGE: { MAX: 100, MIN: 18 },
  HEIGHT: {
    METRIC: {
      CM: { MIN: 100, MAX: 230, DEF: 165 },
      MM: { MIN: 0, MAX: 9, DEF: 5 },
    },
    IMPERIAL: {
      FT: { MIN: 3, MAX: 7, DEF: 5 },
      IN: { MIN: 0, MAX: 11, DEF: 5 },
    },
  },
  WEIGHT: {
    LBS: { MIN: 88, MAX: 330, DEF: 133 },
    KG: { MIN: 40, MAX: 150, DEF: 60 },
    FRACTION: { MIN: 0, MAX: 9, DEF: { KG: 5, LBS: 4 } },
  },
  PLAN: { MAX_LENGTH: 70, MIN_LENGTH: 14 },
  WEIGHT_PRECENTAGE_THRESHOLD: 2,
};

export const REGEX = {
  EMAIL: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  NAME: /^[a-z ,.'-]+$/i,
};

export const ERROR_MESSAGES = {
  UNEQUAL_EMAILS: 'Invalid value: emails are not the same',
  REQUIRED: 'This field is required',
  TERMS: 'Terms must be accepted to continue',
  EMAIL: 'Invalid value: provided email does not follow conventions - example@sample.eg',
  NAME: 'Invalid name: numbers, "@", "!", "$", and other special charachters are not allowed',
  PASSWORD_LENGTH: 'Password must have at least 6 characters and maximum 32',
  NAME_LENGTH: `Minimum allowed length is ${CONSTANTS.NAME.MIN_LENGTH} and maximum ${CONSTANTS.NAME.MAX_LENGTH}`,
  NONNUMBER: 'Invalid value: this field may only contain numbers',
  INVALID_HEIGHT_RANGE: {
    IMPERIAL: {
      FT: `Invalid value: it should be between ${CONSTANTS.HEIGHT.IMPERIAL.FT.MIN} and ${CONSTANTS.HEIGHT.IMPERIAL.FT.MAX} feet`,
      IN: `Invalid value: it should be between ${CONSTANTS.HEIGHT.IMPERIAL.IN.MIN} and ${CONSTANTS.HEIGHT.IMPERIAL.IN.MAX} inches`,
    },
    METRIC: {
      CM: `Invalid value: it should be between ${CONSTANTS.HEIGHT.METRIC.CM.MIN} and ${CONSTANTS.HEIGHT.METRIC.CM.MAX} cm`,
      MM: `Invalid value: it should be between ${CONSTANTS.HEIGHT.METRIC.MM.MIN} and ${CONSTANTS.HEIGHT.METRIC.MM.MAX} cm`,
    },
  },
  INVALID_WEIGHT_RANGE: {
    LBS: `Invalid value: it should be between ${CONSTANTS.WEIGHT.LBS.MIN} and ${CONSTANTS.WEIGHT.LBS.MAX} lbs`,
    KG: `Invalid value: it should be between ${CONSTANTS.WEIGHT.KG.MIN} and ${CONSTANTS.WEIGHT.KG.MAX} kg`,
    FRACTION: `Invalid value: it should be between ${CONSTANTS.WEIGHT.FRACTION.MIN} and ${CONSTANTS.WEIGHT.FRACTION.MAX} kg`,
  },
  MAINTENANCE_GOAL_WEIGHT: `The goal weight can not be more than %${CONSTANTS.WEIGHT_PRECENTAGE_THRESHOLD} different the current user's weight`,
  LOSING_GOAL_WEIGHT: "The goal weight can not be more or equal than the current user's weight",
};
