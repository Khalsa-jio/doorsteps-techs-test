import React from "react"
import { sanityClient } from "../../lib/sanity"
import { GetStaticProps } from "next"
import Header from "../../components/template/Header"
import QuestionModal from "../../components/template/formComponent/questionForm/QuestionModal"

function EditForm({ question }) {
  return (
    <div>
      <Header />
      <div className="my-[50px]">
        {/* <EditQuestion question={question} /> */}
        <QuestionModal question={question} label="edit" />
      </div>
    </div>
  )
}

export default EditForm

export async function getStaticPaths() {
  const query = `
  *[_type=='question']{
    _id
  }
  `
  const questions = await sanityClient.fetch(query)
  const paths = questions.map(question => ({
    params: { id: question._id },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type== "question" && _id == $slug][0]{
    field_id,field_label,field_mandatory,
  field_placeholder,field_type,field_options
  }
  `
  const question = await sanityClient.fetch(query, {
    slug: params?.id,
  })

  if (!question) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      question,
    },
    revalidate: 60,
  }
}
