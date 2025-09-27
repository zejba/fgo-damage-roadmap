// クラス補正
export function getClassAtkCorrectionValue(servantClass: string) {
  switch (servantClass) {
    case 'berserker':
    case 'ruler':
    case 'avenger':
      return 1.1;
    case 'lancer':
      return 1.05;
    case 'archer':
      return 0.95;
    case 'caster':
    case 'assassin':
      return 0.9;
    default:
      return 1;
  }
}
