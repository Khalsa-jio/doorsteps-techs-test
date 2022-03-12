import React from "react"
import { useFormContext } from "react-hook-form"

function Select({ field_id, field_label, field_options, field_value, field_mandatory }) {
  const optionsArr = field_options !== "" ? field_options.split(",") : []
  const fieldName = field_id ? field_id.replace(/[^a-zA-Z0-9]/g, "") : field_label.split(" ")[0]
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <label className="form-label">
        {field_label}
        {field_mandatory === "yes" && "*"}:
      </label>
      <select
        className="block w-full  mt-3  shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
        focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
        aria-label="Default select example"
        name={fieldName}
        defaultValue={field_value}
        {...register(fieldName, { required: field_mandatory === "yes" ? true : false })}
      >
        {optionsArr.length > 0 &&
          optionsArr.map((option, i) => (
            <option value={option} key={i}>
              {option}
            </option>
          ))}
      </select>
      {errors.fieldName?.type === "required" && <span className="text-red-500 text-sm">This field is required</span>}
    </>
  )
}

export default Select
