import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export default function (value, formatStr = 'dd.MM.yyyy') {
  return format(value, formatStr, { locale: ru })
}
