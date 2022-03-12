import React from "react"
import ExperimentForm from "../components/template/formComponent/ExperimentForm"
import Header from "../components/template/Header"

function add() {
  return (
    <>
      <Header />
      <div
        className=" py-16 bg-gray-50 px-4 sm:px-6 min-h-[60vh] h-auto  flex justify-center
  items-center"
      >
        <ExperimentForm />
      </div>
    </>
  )
}

export default add
