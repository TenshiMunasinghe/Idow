export const dateToString = (date: Date) =>
  `${date.getMonth()}月${date.getDay()}日 ${String(date.getHours()).padStart(
    2,
    '0'
  )}:${String(date.getMinutes()).padStart(2, '0')}`
