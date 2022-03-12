import React, { useState } from "react"
import { useEffect } from "react"
import { QuestionInput } from "../../../interfaces"
import LoadingSpinner from "../LoadingSpinner"
import ReactModal from "react-modal"
import QuestionModal from "./questionForm/QuestionModal"
import AddNewButton from "./elements/AddNewButton"
import Tabs from "../Tabs"
import { useRouter } from "next/router"

ReactModal.setAppElement("#__next")

interface FormData {
  serverQues: QuestionInput[]
  clientQues: QuestionInput[]
}
function MasterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    serverQues: [],
    clientQues: [],
  })

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/form/master")
      const result = await response.json()
      console.log(result)
      setFormData({
        serverQues: result,
        clientQues: formData.clientQues,
      })
      setLoading(false)
    }
    getData()
  }, [loading])

  const customStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "0",
      border: "none",
    },
    overlay: {
      backgroundColor: "#eff1f5f0",
    },
  }

  const handleServerDelete = async (id: string) => {
    setLoading(true)
    const response = await fetch("/api/form/master", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
    const result = await response.json()
    if (result.message === "success") {
      console.log(result)
    } else {
      console.log(result)
      setLoading(false)
    }
  }

  const handleClientDelete = (id: string) => {
    const newClientQues = formData.clientQues.filter(ques => ques._key !== id)
    setFormData({ ...formData, clientQues: newClientQues })
  }

  const submitHandle = async () => {
    const response = await fetch("api/form/master", {
      method: "POST",
      body: JSON.stringify({ clientQues: [...formData.clientQues] }),
    })
    const result = await response.json()
    if (result.message === "success") {
      router.push("/")
    } else {
      console.log(result)
    }
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className=" mx-auto w-full shadow max-w-2xl rounded-xl bg-white p-8 ">
          <div className="flex justify-center pb-6 pt-2">
            <h2 className="uppercase font-semibold text-2xl">Master Form</h2>
          </div>
          <AddNewButton setOpen={setOpen} />

          <Tabs
            formData={formData.serverQues}
            label={formData.clientQues.length > 0 ? "server" : "serverClient"}
            handleDelete={handleServerDelete}
          />
          <Tabs formData={formData.clientQues} label="client" handleDelete={handleClientDelete} />
          <ReactModal isOpen={open} style={customStyle} onRequestClose={() => setOpen(false)}>
            <QuestionModal setFormData={setFormData} setOpen={setOpen} label="master" setLoading={setLoading} />
          </ReactModal>
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-8 border border-transparent shadow
          text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={submitHandle}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default MasterForm
