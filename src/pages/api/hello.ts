// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //envio de e-mail
  res.status(200).json({ name: 'John Doe' })
}

//http://localhost:3001/api/hello