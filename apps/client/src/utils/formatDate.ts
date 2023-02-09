export default function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInMinutes = diff / 1000 / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  if (diffInMinutes < 60) {
    return `${Math.round(diffInMinutes)} minutes`;
  } else if (diffInHours < 24) {
    return `${Math.round(diffInHours)} heures`;
  } else {
    return `${Math.round(diffInDays)} jours`;
  }
}
