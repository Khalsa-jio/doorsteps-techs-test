import { GetStaticProps } from "next"
import React from "react"
import { sanityClient } from "../../lib/sanity"
import { ExperimentInput, Experiments } from "../../interfaces"
import SubmitButton from "../../components/template/formComponent/elements/SubmitButton"
import FillForm from "../../components/template/formComponent/FillForm"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/router"
import Header from "../../components/template/Header"

interface Props {
  experiment: Experiments
}

function Forms({ experiment }: Props) {
  const methods = useForm<ExperimentInput>()
  const router = useRouter()

  const onSubmit: SubmitHandler<ExperimentInput> = async data => {
    let newArr = []
    for (const key in data) {
      newArr = [
        ...newArr,
        {
          question: key,
          answer: data[key],
        },
      ]
    }
    const response = await fetch("/api/submitform", {
      body: JSON.stringify({
        experimentId: experiment._id,
        formResponse: newArr,
      }),
      method: "POST",
    })
    const result = await response.json()

    if (result.message === "success") {
      router.push("/thanks")
    } else {
      console.log(result)
    }
  }

  return (
    <FormProvider {...methods}>
      <Header />
      <div>
        <div
          className=" py-16 bg-gray-50 px-4 sm:px-6 h-auto w-screen flex justify-center
    items-center"
        >
          <div className=" mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow">
            <h2 className="h2 text-center uppercase font-semibold text-2xl bg-slate-50 py-2 rounded">
              {experiment.name}
            </h2>
            <form className="grid grid-cols-1 gap-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
              {experiment.masterQuestion.map((field, index) => {
                return (
                  <div key={index}>
                    <FillForm field={field} />
                  </div>
                )
              })}
              {experiment.questions.map((field, index) => {
                return (
                  <div key={index}>
                    <FillForm field={field} />
                  </div>
                )
              })}

              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default Forms

export async function getStaticPaths() {
  const query = `
  *[_type=='experiment']{
    _id,slugName{
      current
    }
  }
  `
  const experiments = await sanityClient.fetch(query)
  const paths = experiments.map(experiment => ({
    params: { slug: experiment.slugName.current },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type== "experiment" && slugName.current == $slug][0]{
    _id,
    name,
    slugName,
    description,
    isEnabled,
    questions,
    "masterQuestion": *[_type == "question"]{
      _id,
      field_label,
      field_type,
      field_placeholder,
      field_mandatory,
      field_value,
      field_options,
      field_id
    }
  }
  `

  const experiment = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!experiment) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      experiment,
    },
    revalidate: 60,
  }
}
