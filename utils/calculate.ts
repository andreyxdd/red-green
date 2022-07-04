export function getRelativeChange(a: number, b: number) {
  return ((b - a) / a) * 100;
}

export function getDailyGoal(
  prevDailyGoalWeight: number,
  startWeight: number,
  goalWeight: number,
  duration: number,
) {
  return prevDailyGoalWeight - (startWeight - goalWeight) / duration;
}

export function FTtoCM(input: number) {
  const feet = Math.trunc(input);
  const inches = Number((`${input}`).split('.')[1]);
  const out = feet * 30.48 + inches * 2.54;
  return Math.round(out);
}

export function CMtoFT(input: number) {
  const fullFeet = ((input * 0.393701) / 12);
  const feet = Math.floor(fullFeet);
  const inches = Math.round((fullFeet - feet) * 12);
  return Number(`${feet}.${inches}`);
}

export function LBStoKG(input: number) {
  const out = input / 2.205;
  return Math.round((out + Number.EPSILON) * 10) / 10;
}

export function KGtoLBS(input: number) {
  const out = input * 2.205;
  return Math.round(out);
}

export function range(size:number, startAt = 0):ReadonlyArray<number> {
  return [...Array(size).keys()].map((i) => i + startAt);
}
