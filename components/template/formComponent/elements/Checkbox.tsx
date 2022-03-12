import React from "react"

interface Props {
  isEnabled: boolean
  setIsEnabled: (isEnabled: boolean) => void
  label?: string
}
export default function CheckboxInput({ setIsEnabled, isEnabled, label = "show" }: Props) {
  return (
    <div className="flex justify-start items-center bg-inherit">
      {/* <label htmlFor="isEnabled">Is disabled:</label> */}
      <input type="checkbox" id="i" name="isEnabled" checked={isEnabled} readOnly />
      <label htmlFor="i" className="checkbox" onClick={() => setIsEnabled(!isEnabled)}>
        <div className="checkbox__inner">
          <div className="green__ball"></div>
        </div>
      </label>
      {label === "show" ? (
        <div className="checkbox__text">
          <span>Experiment</span>
          <div className="checkbox__text--options">
            <span className="on">Visible</span>
            <span className="off">Disable</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
