import { CheckboxMainProps, Experiments } from "../interfaces"
import { sanityClient } from "../lib/sanity"
import Link from "next/link"
import EditIcon from "../components/global/svgIcons/EditIcon"
import FillIcon from "../components/global/svgIcons/FillIcon"
import Header from "../components/template/Header"
import DeleteIcon from "../components/global/svgIcons/DeleteIcon"
import { useRouter } from "next/router"
import CheckboxMain from "../components/template/formComponent/elements/CheckboxMain"
import { useLayoutEffect, useState } from "react"
import { useEffect } from "react"
import LoadingSpinner from "../components/template/LoadingSpinner"

const IndexPage = () => {
  const [isEnabled, setIsEnabled] = useState<CheckboxMainProps[]>([])
  const [experiments, setExperiments] = useState<Experiments[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const handleServerDelete = async (id: string) => {
    const response = await fetch("/api/form/master", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    })
    const result = await response.json()
    if (result.message === "success") {
      router.reload()
    } else {
      console.log(result)
    }
  }

  useEffect(() => {
    const getExperiments = async () => {
      const response = await fetch("/api/form/experiment")
      const result = await response.json()
      console.log(result)
      if (result.message === "success") {
        let newArr = []
        setExperiments(result.data)
        result.data.map(i => (newArr = [...newArr, { isEnabled: i.isEnabled, experimentId: i._id }]))
        setIsEnabled(newArr)
        setLoading(false)
      }
    }
    getExperiments()
  }, [])

  const handleEnable = async (id: string) => {
    setLoading(true)
    const response = await fetch("/api/form/disable", {
      method: "PATCH",
      body: JSON.stringify({ _id: id, isEnabled: !isEnabled.find(i => i.experimentId === id).isEnabled }),
    })
    const result = await response.json()
    if (result.message === "success") {
      router.reload()
    } else {
      console.log(result)
    }
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header />
          <div className="container  mx-auto mt-[50px] flex justify-center">
            <div className="flex justify-center w-fit pb-2 not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
              <div className="relative rounded-xl overflow-auto">
                <div className="shadow-sm overflow-hidden my-8">
                  <table className="border-collapse table-fixed  text-sm">
                    <thead>
                      <tr>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                          Experiment Name
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                          Edit
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                          Fill
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                          Delete
                        </th>
                        <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                          Enabled
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-b border-slate-100 font-semibold text-md dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                          Master Form
                        </td>
                        <td className="border-b mr-2 border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                          <Link href={`/master`}>
                            <button
                              className="inline-flex justify-center py-1 px-2 border border-transparent shadow
                            text-base font-medium rounded-md text-white bg-orange-400 hover:bg-orange-600
                            focus:outline-none focus:ring-2 mx-1 focus:ring-offset-2 focus:ring-orange-400"
                            >
                              <EditIcon classes="h4 w-4" />
                            </button>
                          </Link>
                        </td>
                      </tr>
                      {experiments.length === isEnabled.length &&
                        experiments.map((experiment: Experiments, index) => (
                          <tr key={experiment._id}>
                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                              {experiment.name}
                            </td>
                            <td className="border-b mr-2 border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                              <Link href={`/experiment/${experiment._id}`}>
                                <button
                                  className="inline-flex justify-center py-1 px-2 border border-transparent shadow
                            text-base font-medium rounded-md text-white bg-orange-400 hover:bg-orange-600
                            focus:outline-none focus:ring-2 mx-1 focus:ring-offset-2 focus:ring-orange-400"
                                  onClick={() => setLoading(true)}
                                >
                                  <EditIcon classes="h4 w-4" />
                                </button>
                              </Link>
                            </td>
                            <td className="border-b mr-2 border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                              {experiment.isEnabled && (
                                <Link href={`/forms/${experiment.slugName.current}`}>
                                  <button
                                    className="inline-flex justify-center mx-1 py-1 px-2 border border-transparent shadow
                            text-base font-medium rounded-md text-white bg-cyan-400 hover:bg-cyan-600
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
                                    onClick={() => setLoading(true)}
                                  >
                                    <FillIcon classes="h4 w-4" />
                                  </button>
                                </Link>
                              )}
                            </td>
                            <td className="border-b mr-2 border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                              <button
                                className="inline-flex justify-center py-1 px-2 border border-transparent shadow
                            text-base font-medium rounded-md text-white bg-red-400 hover:bg-red-600
                            focus:outline-none focus:ring-2 mx-1 focus:ring-offset-2 focus:ring-red-400"
                                onClick={() => handleServerDelete(experiment._id)}
                              >
                                <DeleteIcon classes="h4 w-4" />
                              </button>
                            </td>
                            <td className="border-b mr-2 border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                              <button
                                className="inline-flex justify-center py-1 px-2 border border-transparent 
                            text-base font-medium rounded-md bg-inherit
                            focus:outline-none  mx-1 "
                                onClick={() => handleEnable(isEnabled[index].experimentId)}
                              >
                                <CheckboxMain isEnabled={isEnabled} index={index} label="hide" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default IndexPage

// export const getServerSideProps = async () => {
//   const query = `
//   *[_type=="experiment"]{
//     _id,
//     name,
//     slugName,
//     description,
//     isEnabled,
//     questions
//   }`

//   const experiments = await sanityClient.fetch(query)

//   return {
//     props: {
//       experiments,
//     },
//   }
// }
