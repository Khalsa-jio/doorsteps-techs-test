import type { NextApiRequest, NextApiResponse } from "next"
import sanityClient from "@sanity/client"
import { slugNameGenerator } from "../../../components/global/Function"
import { config } from "../../../lib/sanity"

const client = sanityClient(config)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    const { _id, isEnabled } = JSON.parse(req.body)
    try {
      await client
        .patch(_id)
        .set({
          isEnabled,
        })
        .commit()

      res.status(200).json({ message: "success" })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "could not update ", err })
    }
  }
}
