import Link from "next/link"
import React, { useEffect, useState } from "react"
import ArrowUp from "../global/svgIcons/ArrowUp"
import DeleteIcon from "../global/svgIcons/DeleteIcon"
import EditIcon from "../global/svgIcons/EditIcon"
import { Collapse } from "react-collapse"
import { QuestionInput } from "../../interfaces"

interface Props {
  label?: string
  formData: QuestionInput[]
  handleDelete: (id: string) => void
}

function Tabs({ formData, handleDelete, label }: Props) {
  const [tabOpen, setTabOpen] = useState([])

  useEffect(() => {
    let newArr = []
    if (formData.length > 0) {
      formData.map(item => {
        newArr = [...newArr, { id: item._id, open: false }]
        return newArr
      })
      setTabOpen(newArr)
    }
  }, [formData])

  const handleTab = (id: string) => {
    const newTabOpen = tabOpen.map(tab => {
      if (tab.id === id) {
        return { ...tab, open: !tab.open }
      } else {
        return tab
      }
    })
    setTabOpen(newTabOpen)
  }
  return (
    formData.length > 0 && (
      <div
        className={`${label !== "experiment" ? "py-6 my-6" : "py-1"} ${label === "client" && "pt-0 mt-0"} ${
          label === "server" && "pb-0 mb-0"
        }  rounded-xl`}
      >
        {formData.length === tabOpen.length &&
          formData.map((item, index) => {
            const { _id, _key, field_type, field_placeholder, field_mandatory, field_label, field_id } = item
            const { open } = tabOpen[index]
            const unique = _id ? _id : _key
            return (
              <div key={index} className=" m-1">
                <div className="p-3 rounded-full bg-slate-100 hover:bg-slate-300 cursor-pointer  m-b-1 relative ">
                  <h2 className="text-sm font-medium w-[80%] h-[100%] " onClick={() => handleTab(_id)}>
                    {field_label}
                  </h2>
                  {label !== "client" && label !== "experiment" && (
                    <Link href={`/edit/${_id}`}>
                      <a>
                        <EditIcon classes="w-5 h-5 block opacity-40 absolute right-20 top-[30%] hover:text-white duration-150 hover:opacity-100" />
                      </a>
                    </Link>
                  )}

                  <a onClick={() => handleDelete(unique)}>
                    <DeleteIcon classes="w-5 h-5 block opacity-40 absolute right-10 top-[30%] hover:text-white duration-150 hover:opacity-100" />
                  </a>

                  <a onClick={() => handleTab(_id)}>
                    <ArrowUp
                      classes={`w-5 h-5 block opacity-40 absolute right-2 top-[30%] hover:text-white duration-150 hover:opacity-100  ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </a>
                </div>
                <Collapse isOpened={open}>
                  <ul className="py-3 px-6">
                    <li>
                      <b>Type:</b> {field_type}
                    </li>
                    <li>
                      <b>Placeholder:</b> {field_placeholder}
                    </li>
                    <li>
                      <b>Is Mandatory:</b> {field_mandatory}
                    </li>
                    <li>
                      <b>Question Id:</b> {field_id}
                    </li>
                  </ul>
                </Collapse>
              </div>
            )
          })}
      </div>
    )
  )
}

export default Tabs
