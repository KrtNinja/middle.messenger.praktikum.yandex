function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const mouth = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const difference = now.getDate() - date.getDate();

  let dateString = `${day} ${mouth}`;

  if (difference < 1) {
    dateString = `${hours}:${minutes}`;
  }

  if (difference === 1) {
    dateString = 'Вчера';
  }

  return dateString;
}

export default formatDate;