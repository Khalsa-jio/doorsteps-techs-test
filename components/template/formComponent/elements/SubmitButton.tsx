import React from "react"

export default function SubmitButton() {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-8 border border-transparent shadow
          text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  )
}
