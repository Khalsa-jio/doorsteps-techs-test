import React from "react"
import MasterForm from "../components/template/formComponent/MasterForm"
import Header from "../components/template/Header"

function master() {
  return (
    <>
      <Header />
      <div
        className=" py-16 bg-gray-50 px-4 sm:px-6 h-auto flex justify-center
items-center"
      >
        <MasterForm />
      </div>
    </>
  )
}

export default master
