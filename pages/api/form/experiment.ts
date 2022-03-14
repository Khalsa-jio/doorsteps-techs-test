import type { NextApiRequest, NextApiResponse } from "next"
import sanityClient from "@sanity/client"
import { slugNameGenerator } from "../../../components/global/Function"
import { config } from "../../../lib/sanity"

const client = sanityClient(config)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const experiments = await client.fetch(`*[_type=="experiment"]{
        _id,
        name,
        slugName,
        description,
        isEnabled,
        questions
      }`)
      res.status(200).json({ data: experiments, message: "success" })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "could not submit comment", err })
    }
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
