import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import SubmitButton from "../elements/SubmitButton"
import { useForm, SubmitHandler } from "react-hook-form"
import { QuestionInput } from "../../../../interfaces"
import { getUniqueId, slugNameGenerator } from "../../../global/Function"

interface Props {
  setFormData?: (formData: any) => void
  setOpen?: (open: boolean) => void
  label: string
  question?: QuestionInput
  setLoading?: (loading: boolean) => void
}

interface QuestionType {
  type: string
}

function QuestionModal({ setFormData, setOpen, label, question, setLoading }: Props) {
  const [questionType, setQuestionType] = useState<QuestionType>({ type: "" })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuestionInput>(
    question
      ? { defaultValues: question }
      : {
          defaultValues: {
            field_type: "text",
          },
        }
  )

  const watchTypeField = watch("field_type")

  const router = useRouter()

  useEffect(() => {
    if (watchTypeField === "select") {
      setQuestionType({ type: "select" })
    }
  }, [watchTypeField])

  const onSubmit: SubmitHandler<QuestionInput> = async data => {
    if (label === "experiment") {
      setFormData(prev => {
        data._key = `${slugNameGenerator(data.field_label)}-${slugNameGenerator(data.field_type)}`
        return {
          ...prev,
          questions: [...prev.questions, data],
        }
      })
      setOpen(false)
    } else if (label === "master") {
      data._key = `${slugNameGenerator(data.field_label)}-${slugNameGenerator(data.field_type)}`
      setFormData(prev => {
        return {
          serverQues: [...prev.serverQues],
          clientQues: [...prev.clientQues, data],
        }
      })
      setOpen(false)
      setLoading(true)
    } else if (question && label === "edit") {
      const response = await fetch("/api/form/master", {
        body: JSON.stringify({
          ...router.query,
          ...data,
        }),
        method: "PATCH",
      })
      const result = await response.json()

      if (result.message === "success") {
        router.push("/master")
      } else {
        console.log(result)
      }
    }
  }
  return (
    <div
      className={`py-16 bg-white px-4 sm:px-6  h-auto flex justify-start items-start  rounded-xl max-w-2xl 
      p-5 shadow${
        label === "edit" ? " mx-auto  " : " px-4 min-h-[400px] min-w-[350px]  sm:min-w-[400px] md:min-w-[600px]"
      }`}
    >
      <div
        id="question-modal"
        className={`mx-auto w-full  px-3 ${label === "edit" ? " h-auto" : " h-[70vh] overflow-y-scroll "}`}
      >
        <div className="flex justify-center pb-6 ">
          <h2 className="uppercase">{label === "edit" ? "Edit " : "Add New "}Question</h2>
        </div>
        <form key={2} onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-y-6 ">
            <div>
              <label className="mb-3" htmlFor="field_label">
                Question*:
              </label>
              <input
                className="block w-full  cursor-pointer shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
              focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
                type="text"
                name="field_label"
                aria-label="field_label"
                placeholder={`Enter Question`}
                {...register("field_label", { required: true })}
              />
              {errors.field_label?.type === "required" && (
                <span className="text-red-500 text-sm">Question is required</span>
              )}
            </div>
            <div>
              <label className="mb-3" htmlFor="field_id">
                Field Id:
              </label>
              <input
                className="block w-full  cursor-pointer shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
              focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
                type="text"
                name="field_id"
                aria-label="field_id"
                placeholder={`Enter Unique Field Id`}
                {...register("field_id", { required: true })}
              />
              {errors.field_id?.type === "required" && <span className="text-red-500 text-sm">Field Id required</span>}
            </div>
            <div>
              <label className="mb-3" htmlFor="field_mandatory">
                Is Mandatory:
              </label>
              <input
                className="block w-full  cursor-pointer shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
              focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
                type="text"
                name="field_mandatory"
                aria-label="field_mandatory"
                placeholder={` Enter "yes" or "no"`}
                {...register("field_mandatory", { required: true, minLength: 2, maxLength: 3 })}
              />
              {errors.field_mandatory?.type === "required" && (
                <span className="text-red-500 text-sm">Is mandatory field required</span>
              )}
            </div>
            <div>
              <label className="mb-3" htmlFor="field_placeholder">
                Placeholder:
              </label>
              <input
                className="block w-full  cursor-pointer shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
              focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
                type="text"
                name="field_placeholder"
                aria-label="field_placeholder"
                placeholder="Enter  Placeholder"
                {...register("field_placeholder")}
              />
            </div>
            <div>
              <label className="mb-3" htmlFor="field_value">
                Value:
              </label>
              <input
                className="block w-full  cursor-pointer shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
              focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
                type="text"
                name="field_value"
                aria-label="field_value"
                placeholder="Enter if any initial value required"
                {...register("field_value")}
              />
            </div>
            <div className="pt-6">
              <label className="mb-3" htmlFor="field_type">
                Question Type
              </label>
              <select
                className="block w-full  cursor-pointer shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
              focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
                name={register("field_type").name}
                ref={register("field_type").ref}
                {...(register("field_type"), { required: true })}
                onChange={e => {
                  register("field_type").onChange(e)
                }}
              >
                <option value="text">Single Line</option>
                <option value="textarea">Multiple Line</option>
                <option value="select">Multiple Choice</option>
              </select>
              {errors.field_type?.type === "required" && (
                <span className="text-red-500 text-sm">Type of question is required </span>
              )}
            </div>
            {watchTypeField === "select" && (
              <div>
                <label className="mb-3" htmlFor="field_options">
                  Options
                </label>
                <input
                  className="block w-full  cursor-pointer shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500
              focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  type="text"
                  name="field_options"
                  aria-label="field_options"
                  placeholder="Enter option with commas. e.g- Option 1, Option 2, Option 3"
                  {...register("field_options", { required: true })}
                />
              </div>
            )}
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionModal
