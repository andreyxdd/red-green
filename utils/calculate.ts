export function getRelativeChange(a: number, b: number) {
  return ((b - a) / a) * 100;
}

export function adjustDailyGoal(
  previousDailyGoalWeight: number,
  startWeight: number,
  planGoalWeight: number,
  startDate: number,
  endDate: number,
) {
  return previousDailyGoalWeight - (startWeight - planGoalWeight) / (endDate - startDate);
}

export function FTtoCM(input: number) {
  const out = input * 30.48;
  return Math.round((out + Number.EPSILON) * 100) / 100;
}

export function CMtoFT(input: number) {
  const out = input / 30.48;
  return Math.round((out + Number.EPSILON) * 100) / 100;
}

export function LBStoKG(input: number) {
  const out = input / 2.205;
  return Math.round((out + Number.EPSILON) * 100) / 100;
}

export function KGtoLBS(input: number) {
  const out = input * 2.205;
  return Math.round((out + Number.EPSILON) * 100) / 100;
}
