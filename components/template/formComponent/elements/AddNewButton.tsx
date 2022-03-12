import Link from "next/link"
import React from "react"

interface Props {
  setOpen: (open: boolean) => void
}
function AddNewButton({ setOpen }: Props) {
  return (
    <div>
      {/* <Link href={"/add?addQuestion=1"}> */}
      <button
        className="inline-flex justify-center py-2 px-6 border border-transparent shadow
    text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        onClick={() => setOpen(true)}
      >
        Add New Question
      </button>
      {/* </Link> */}
    </div>
  )
}

export default AddNewButton
