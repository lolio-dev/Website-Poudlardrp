export function getDateDiff(date1: number, date2: number): string {
  const diff = Math.abs(date1 - date2) / 1000;
  if (diff < 60) {
    return `${Math.round(diff)} secondes`;
  } else if (diff < 3600) {
    return `${Math.round(diff / 60)} minutes`;
  } else if (diff < 86400) {
    return `${Math.round(diff / 3600)} heures`;
  } else if (diff < 2628000) {
    return `${Math.round(diff / 86400)} jours`;
  } else if (diff < 31536000) {
    return `${Math.round(diff / 2628000)} mois`;
  } else {
    return `${Math.round(diff / 31536000)} ans`;
  }
}
