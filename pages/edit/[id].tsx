import React, { useState } from "react"
import { sanityClient } from "../../lib/sanity"
import { GetStaticProps } from "next"
import Header from "../../components/template/Header"
import QuestionModal from "../../components/template/formComponent/QuestionForm"
import { QuestionInput } from "../../interfaces"
import { useEffect } from "react"
import { useRouter } from "next/router"
import LoadingSpinner from "../../components/template/LoadingSpinner"
interface Props {
  question: QuestionInput
}
function EditForm() {
  // { question }: Props
  const [question, setQuestion] = useState<QuestionInput>()
  const {
    query: { id },
  } = useRouter()

  useEffect(() => {
    //! to render data on client side
    const getQuestion = async () => {
      const query = `
   *[_type== "question" && _id == $slug][0]{
     field_id,field_label,field_mandatory,field_placeholder,field_type,field_options
  }
   `
      const questionServer = await sanityClient.fetch(query, {
        slug: id,
      })
      setQuestion(questionServer)
    }
    if (id) {
      getQuestion()
    }
  }, [id])

  return (
    <div>
      <Header />
      <div className="my-[50px]">
        {/* <EditQuestion question={question} /> */}
        {question ? <QuestionModal question={question} label="edit" /> : <LoadingSpinner />}
      </div>
    </div>
  )
}

export default EditForm

//! to create static Pages
// export async function getStaticPaths() {
//   const query = `
//   *[_type=='question']{
//     _id
//   }
//   `
//   const questions = await sanityClient.fetch(query)
//   const paths = questions.map(question => ({
//     params: { id: question._id },
//   }))
//   return { paths, fallback: false }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const query = `
//   *[_type== "question" && _id == $slug][0]{
//     field_id,field_label,field_mandatory,
//   field_placeholder,field_type,field_options
//   }
//   `
//   const question = await sanityClient.fetch(query, {
//     slug: params?.id,
//   })

//   if (!question) {
//     return {
//       notFound: true,
//     }
//   }
//   return {
//     props: {
//       question,
//     },
//     revalidate: 10,
//   }
// }

//! to create server side Pages

// export async function getServerSideProps({ params }) {
//   const query = `
//    *[_type== "question" && _id == $slug][0]{
//      field_id,field_label,field_mandatory,
//    field_placeholder,field_type,field_options
//  }
//    `
//   const question = await sanityClient.fetch(query, {
//     slug: params?.id,
//   })

//   if (!question) {
//     return {
//       notFound: true,
//     }
//   }
//   return {
//     props: {
//       question,
//     },
//   }
// }
