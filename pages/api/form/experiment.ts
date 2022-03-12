import type { NextApiRequest, NextApiResponse } from "next"
import sanityClient from "@sanity/client"
import { slugNameGenerator } from "../../../components/global/Function"

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { _id } = req.query
    const result = await client.getDocument(_id[0])
    res.status(200).json(result)
  } else if (req.method === "POST") {
    const { name, description, isEnabled, questions } = JSON.parse(req.body)

    try {
      await client.create({
        _type: "experiment",
        description,
        name,
        isEnabled,
        slugName: {
          _type: "slug",
          current: slugNameGenerator(name),
        },
        questions: questions.map(question => ({
          _key: `${slugNameGenerator(question.field_label)}-${slugNameGenerator(question.field_type)}`,
          ...question,
        })),
      })
      res.status(200).json({ message: "success" })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "could not submit comment", err })
    }
  } else if (req.method === "PATCH") {
    const { _id, name, description, isEnabled, questions } = JSON.parse(req.body)
    try {
      await client
        .patch(_id)
        .set({
          name,
          description,
          isEnabled,
          slugName: {
            _type: "slug",
            current: slugNameGenerator(name),
          },
          questions: questions.map(question => ({
            _key: `${slugNameGenerator(question.field_label)}-${slugNameGenerator(question.field_type)}`,
            ...question,
          })),
        })
        .commit()

      res.status(200).json({ message: "success" })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "could not update ", err })
    }
  }
}
