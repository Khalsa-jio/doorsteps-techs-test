import React from "react"
import { useFormContext } from "react-hook-form"

function Textarea({ field_id, field_label, field_placeholder, field_value, field_mandatory }) {
  const fieldName = field_id ? field_id.replace(/[^a-zA-Z0-9]/g, "") : field_label.split(" ")[0]

  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <label className="" htmlFor="description">
        {field_label}
        {field_mandatory && field_mandatory === "yes" && "*"}:
      </label>
      <textarea
        className="block w-full mt-2 shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
      focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
        name={fieldName}
        aria-label={fieldName}
        defaultValue={field_value}
        placeholder={field_placeholder ? field_placeholder : ""}
        {...register(fieldName, { required: field_mandatory === "yes" ? true : false })}
        rows={4}
      ></textarea>
      {errors.fieldName?.type === "required" && <span className="text-red-500 text-sm">{field_label} is required</span>}
    </>
  )
}

export default Textarea
