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
