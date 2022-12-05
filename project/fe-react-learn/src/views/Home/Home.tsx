import React from 'react'
import { DatePicker, } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import moment from 'moment'

type HomeProps = {
  children?: React.ReactNode
}

export default function Home ({ children }: HomeProps) {
  const disabledDate: RangePickerProps['disabledDate'] = current => {
    return current && current < moment().endOf('day')
  }
  return (
    <div>
      <DatePicker picker='year' disabledDate={disabledDate}></DatePicker>
    </div>
  )
}
