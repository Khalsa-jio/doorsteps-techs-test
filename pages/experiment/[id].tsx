import React from "react"
import { sanityClient } from "../../lib/sanity"
import { GetStaticProps } from "next"
import Header from "../../components/template/Header"
import ExperimentForm from "../../components/template/formComponent/ExperimentForm"
import { ExperimentInput, QuestionFormData } from "../../interfaces"

interface Props {
  experiment: ExperimentInput
}

function EditForm({ experiment }: Props) {
  return (
    <div>
      <Header />
      <div className="my-[50px]">
        <ExperimentForm experimentData={experiment} label="editExperiment" />
      </div>
    </div>
  )
}

export default EditForm

export async function getStaticPaths() {
  const query = `
  *[_type=='experiment']{
    _id
  }
  `
  const experiments = await sanityClient.fetch(query)
  const paths = experiments.map(experiment => ({
    params: { id: experiment._id },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type== "experiment"&& _id == $slug][0]{
    _id,name, description, isEnabled, slugName,questions
    }
  `
  const experiment = await sanityClient.fetch(query, {
    slug: params?.id,
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
