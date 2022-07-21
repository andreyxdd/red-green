function getFirstDigitAfterComma(num: number) {
  const res = Number(
    (`${Math.round((num + Number.EPSILON) * 10) / 10}`)
      .split('.')[1],
  );
  return Number.isNaN(res) ? 0 : res;
}

export function getWeightInterface(weight: number) {
  return [Math.floor(weight), getFirstDigitAfterComma(weight)];
}

export function getWeightValue(whole: number, fraction: number) {
  return whole + fraction / 10;
}

export function FTandINtoCMandMM(feet: number, inches: number) {
  const cmANDmm = feet * 30.48 + inches * 2.54;
  const cm = Math.floor(cmANDmm);
  const mm = getFirstDigitAfterComma(cmANDmm - cm);
  return { cm, mm };
}

export function CMandMMtoFTandIN(cm: number, mm: number) {
  const totalMM = cm * 10 + mm;
  const totalIN = totalMM / 25.4;
  const feet = Math.floor(totalIN / 12);
  const inches = Math.round(totalIN - feet * 12);

  return { feet, inches };
}

export function KGtoLBS(kgValue: number) {
  const totalLBS = kgValue * 2.205;
  const lbs = Math.floor(totalLBS);
  const lbsFraction = getFirstDigitAfterComma(totalLBS - lbs);

  return { integer: lbs, fraction: lbsFraction };
}

export function LBStoKG(lbsValue: number) {
  const totalKG = lbsValue / 2.205;
  const kg = Math.floor(totalKG);
  const kgFraction = getFirstDigitAfterComma(totalKG - kg);

  return { integer: kg, fraction: kgFraction };
}
