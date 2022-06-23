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
