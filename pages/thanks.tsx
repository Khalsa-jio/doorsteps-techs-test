import Link from "next/link"
import React from "react"
import Header from "../components/template/Header"

function thanks() {
  return (
    <div>
      <Header />
      <div className="h-[80vh] w-screen flex flex-col gap-3 justify-center items-center">
        <div className="text-4xl uppercase font-medium text-primary animate-pulse duration-300">
          Thank you for Submitting the form{" "}
        </div>
        <Link href="/">
          <a className="bg-primary py-2 text-white font-semibold px-6 rounded-full">Fill Again</a>
        </Link>
      </div>
    </div>
  )
}

export default thanks
