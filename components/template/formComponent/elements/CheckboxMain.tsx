import React from "react"
import { CheckboxMainProps } from "../../../../interfaces"

interface Props {
  isEnabled: CheckboxMainProps[]
  label?: string
  index?: number
}
export default function CheckboxInput({ isEnabled, index, label = "show" }: Props) {
  return (
    <div className="flex justify-start items-center bg-inherit">
      {/* <label htmlFor="isEnabled">Is disabled:</label> */}
      <input type="checkbox" id="i" name="isEnabled" checked={isEnabled[index].isEnabled} readOnly />
      <label htmlFor="i" className="checkbox">
        <div className="checkbox__inner">
          <div className="green__ball"></div>
        </div>
      </label>
    </div>
  )
}
