import type { NextApiRequest, NextApiResponse } from "next"
import sanityClient from "@sanity/client"
import { slugNameGenerator } from "../../components/global/Function"

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { experimentId, formResponse } = JSON.parse(req.body)

  try {
    await client.create({
      _type: "formResponse",
      experiment: {
        _type: "reference",
        _ref: experimentId,
      },
      response: formResponse.map(({ question, answer }) => ({
        _key: `${slugNameGenerator(question)}-${slugNameGenerator(answer)}`,
        question,
        answer,
      })),
    })
    res.status(200).json({ message: "success" })
  } catch (err) {
    return res.status(500).json({ message: "could not submit form", err })
  }
}
