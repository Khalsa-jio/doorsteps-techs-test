import React from "react"
import { sanityClient } from "../../lib/sanity"
import { GetStaticProps } from "next"
import Header from "../../components/template/Header"
import ExperimentForm from "../../components/template/formComponent/ExperimentForm"
import { ExperimentInput, QuestionFormData } from "../../interfaces"
import { useEffect } from "react"
import { useRouter } from "next/router"
import LoadingSpinner from "../../components/template/LoadingSpinner"

// interface Props {
//   experiment: ExperimentInput
// }

function EditForm() {
  // { experiment }: Props
  const [experiment, setExperiment] = React.useState<ExperimentInput>()
  const {
    query: { id },
  } = useRouter()
  useEffect(() => {
    //! to render data on client side
    const getExperiment = async () => {
      const query = `
      *[_type== "experiment"&& _id == $slug][0]{
          _id,name, description, isEnabled, slugName,questions
          }
      `
      const experiment = await sanityClient.fetch(query, {
        slug: id,
      })
      setExperiment(experiment)
    }

    if (id) {
      getExperiment()
    }
  }, [id])

  console.log(experiment)
  return (
    <div>
      <Header />
      <div className="my-[50px]">
        {experiment ? <ExperimentForm experimentData={experiment} label="editExperiment" /> : <LoadingSpinner />}
      </div>
    </div>
  )
}

export default EditForm

//! to create static Pages

// export async function getStaticPaths() {
//   const query = `
//   *[_type=='experiment']{
//     _id
//   }
//   `
//   const experiments = await sanityClient.fetch(query)
//   const paths = experiments.map(experiment => ({
//     params: { id: experiment._id },
//   }))
//   return { paths, fallback: false }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const query = `
//   *[_type== "experiment"&& _id == $slug][0]{
//     _id,name, description, isEnabled, slugName,questions
//     }
//   `
//   const experiment = await sanityClient.fetch(query, {
//     slug: params?.id,
//   })

//   if (!experiment) {
//     return {
//       notFound: true,
//     }
//   }
//   return {
//     props: {
//       experiment,
//     },
//     revalidate: 30,
//   }
// }

//! to create server side Pages
// export async function getServerSideProps({ params }) {
//   const query = `
//   *[_type== "experiment"&& _id == $slug][0]{
//     _id,name, description, isEnabled, slugName,questions
//     }
//   `
//   const experiment = await sanityClient.fetch(query, {
//     slug: params?.id,
//   })

//   if (!experiment) {
//     return {
//       notFound: true,
//     }
//   }
//   return {
//     props: {
//       experiment,
//     },
//   }
// }
