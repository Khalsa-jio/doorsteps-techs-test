import type { NextApiRequest, NextApiResponse } from "next"
import sanityClient from "@sanity/client"

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const masterData = await client.fetch(`*[_type == "question"]{
        _id,
        field_label,
        field_type,
        field_id,
        field_placeholder,
        field_mandatory,
        field_value,
        field_options
      }`)
      res.status(200).json(masterData)
    } catch (err) {
      return res.status(500).json({ message: "could not submit form", err: err })
    }
  } else if (req.method === "PATCH") {
    const { id, field_value, field_id, field_label, field_mandatory, field_placeholder, field_type, field_options } =
      JSON.parse(req.body)

    try {
      await client
        .patch(id)
        .set({
          field_label,
          field_type,
          field_id,
          field_placeholder,
          field_mandatory,
          field_options,
          field_value,
        })
        .commit()

      res.status(200).json({ message: "success" })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "could not update ", err })
    }
  } else if (req.method === "POST") {
    const { clientQues } = JSON.parse(req.body)

    try {
      await clientQues.map(question =>
        client.create({
          _type: "question",
          ...question,
        })
      )

      res.status(200).json({ message: "success" })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "could not create ", err })
    }
  } else if (req.method === "DELETE") {
    const { id } = JSON.parse(req.body)
    try {
      await client.delete(id)
      res.status(200).json({ message: "success" })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "could not delete ", err })
    }
  } else {
    res.status(500)
    res.end()
  }
}
