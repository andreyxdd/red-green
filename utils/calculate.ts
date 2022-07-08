export function getRelativeChange(a: number, b: number) {
  return ((b - a) / a) * 100;
}

export function getPrecentage(value: number, precentage: number) {
  return value * (precentage * 0.01);
}

export function getDailyGoal(
  prevDailyGoalWeight: number,
  startWeight: number,
  goalWeight: number,
  duration: number,
) {
  return prevDailyGoalWeight - (startWeight - goalWeight) / duration;
}

export function LBStoKG(input: number) {
  const out = input / 2.205;
  return Math.round((out + Number.EPSILON) * 10) / 10;
}

export function KGtoLBS(input: number) {
  const out = input * 2.205;
  return Math.round(out);
}
