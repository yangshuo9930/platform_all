import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
const DATE_FORMAT = 'YYYY-MM-DD '

export function formatToDateTime(date: number | Date, formatStr = DATE_TIME_FORMAT): string {
  return dayjs(date).format(formatStr)
}

export function formatToDate(date: number | Date, formatStr = DATE_FORMAT): string {
  return dayjs(date).format(formatStr)
}
