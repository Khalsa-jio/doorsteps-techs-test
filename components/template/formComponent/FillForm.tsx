import React from "react"
import Input from "./elements/Input"
import Select from "./elements/Select"
import Textarea from "./elements/Textarea"

function FillForm({
  field: { field_type, field_id, field_label, field_placeholder, field_value, field_options, field_mandatory },
}) {
  switch (field_type) {
    case "text":
      return (
        <Input
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          field_mandatory={field_mandatory}
        />
      )
    case "select":
      return (
        <Select
          field_id={field_id}
          field_label={field_label}
          field_value={field_value}
          field_options={field_options}
          field_mandatory={field_mandatory}
        />
      )
    case "textarea":
      field_mandatory = { field_mandatory }
      return (
        <Textarea
          field_id={field_id}
          field_placeholder={field_placeholder}
          field_label={field_label}
          field_value={field_value}
          field_mandatory={field_mandatory}
        />
      )

    default:
      return null
  }
}

export default FillForm
