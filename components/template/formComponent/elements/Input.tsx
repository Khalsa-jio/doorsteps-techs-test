import React from "react"
import { useFormContext } from "react-hook-form"

const Input = ({ field_id, field_label, field_placeholder, field_value, field_mandatory }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  console.log(errors)
  const fieldName = field_id ? field_id.replace(/[^a-zA-Z0-9]/g, "") : field_label.split(" ")[0]
  return (
    <div>
      <label className="" htmlFor="field_label">
        {field_label}
        {field_mandatory === "yes" && "*"}:
      </label>
      <input
        className="block w-full  mt-3  shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
        focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
        type="text"
        name={fieldName}
        aria-label={fieldName}
        defaultValue={field_value}
        placeholder={field_placeholder ? field_placeholder : ""}
        {...register(fieldName, { required: field_mandatory === "yes" ? true : false })}
      />
      {errors.fieldName?.type === "required" && <span className="text-red-500 text-sm">This field is required</span>}
    </div>
  )
}

export default Input
