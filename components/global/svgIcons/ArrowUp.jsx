import React from "react"

function ArrowUp({ classes }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`toggle-icon ${classes}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  )
}

export default ArrowUp
