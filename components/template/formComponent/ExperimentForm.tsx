import SubmitButton from "./elements/SubmitButton"
import React, { useState } from "react"
import ReactModal from "react-modal"
import { useRouter } from "next/router"
import QuestionModal from "./QuestionForm"
import CheckboxInput from "./elements/Checkbox"
import { useForm, SubmitHandler as SubmitHandler1 } from "react-hook-form"
import { ExperimentInput, QuestionFormData, QuestionInput } from "../../../interfaces"
import AddNewButton from "./elements/AddNewButton"
import Tabs from "../Tabs"
import LoadingSpinner from "../LoadingSpinner"

ReactModal.setAppElement("#__next")

interface Props {
  experimentData?: ExperimentInput
  label?: string
}

function experimentForm({ experimentData, label }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEnabled, setIsEnabled] = useState(experimentData ? experimentData.isEnabled : false)
  const [formData, setFormData] = useState<QuestionFormData>({
    questions: experimentData ? experimentData.questions : [],
  })
  const router = useRouter()

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
  } = useForm<ExperimentInput>({
    mode: "onBlur",
    defaultValues: experimentData ? experimentData : {},
  })

  const onSubmit1: SubmitHandler1<ExperimentInput> = async data => {
    setLoading(true)
    const { questions } = formData
    data.questions = questions
    data.isEnabled = isEnabled
    data._id = experimentData ? experimentData._id : ""
    if (questions.length > 0) {
      let response
      if (label === "editExperiment") {
        response = await fetch("/api/form/experiment", {
          body: JSON.stringify(data),
          method: "PATCH",
        })
      } else {
        response = await fetch("/api/form/experiment", {
          body: JSON.stringify(data),
          method: "POST",
        })
      }
      const result = await response.json()
      if (result.message === "success") {
        router.push("/")
      } else {
        console.log(result)
      }
    }
  }

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
      width: "70%",
      display: "flex",
      justifyContent: "center",
    },
    overlay: {
      backgroundColor: "#eff1f5f0",
    },
  }

  const handleDelete = (id: string) => {
    const newQuestions = formData.questions.filter(
      (question: QuestionInput) => question._id !== id && question._key !== id
    )
    setFormData({
      ...formData,
      questions: newQuestions,
    })
  }
  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className=" mx-auto w-full max-w-2xl rounded-xl  bg-white p-8 shadow">
        <div className="flex justify-center py-6">
          <h2 className="uppercase font-semibold text-2xl  ">Add New Experiment</h2>
        </div>
        <AddNewButton setOpen={setOpen} />

        <form key={1} className=" mt-3 grid grid-cols-1 gap-y-6 " onSubmit={handleSubmit1(onSubmit1)}>
          <div>
            <label className="" htmlFor="field_label">
              Experiment Name*:
            </label>
            <input
              className="block w-full mt-2  cursor-pointer shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
              focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
              type="text"
              name="name"
              aria-label="name"
              placeholder={`Enter Experiment Name`}
              {...register1("name", { required: true })}
            />
            {errors1.name?.type === "required" && (
              <span className="text-red-500 text-sm">Experiment Name is required</span>
            )}
          </div>

          <div>
            <label className="" htmlFor="description">
              Experiment Description:
            </label>
            <textarea
              className="block w-full mt-2 shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
          focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
              aria-label="Experiment Description"
              placeholder="Experiment Description"
              name="description"
              rows={4}
              {...register1("description")}
            ></textarea>
          </div>
          <Tabs formData={formData.questions} handleDelete={handleDelete} label="experiment" />

          <CheckboxInput isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
          <SubmitButton />
        </form>
      </div>
      <ReactModal isOpen={open} style={customStyle} onRequestClose={() => setOpen(!open)}>
        <QuestionModal setFormData={setFormData} setOpen={setOpen} label="experiment" />
      </ReactModal>
    </>
  )
}

export default experimentForm
