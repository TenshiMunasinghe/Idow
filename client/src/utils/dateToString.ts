export const dateToString = (date: Date) =>
  isNaN(date.getTime())
    ? ''
    : `${date.getMonth() + 1}月${date.getDate()}日 ${String(
        date.getHours()
      ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
