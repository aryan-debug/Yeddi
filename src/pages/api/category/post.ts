import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from "formidable";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({keepExtensions: true, uploadDir: "./uploads"});
  form.parse(req);
  res.send({"status": "received"});
}

export const config = {
    api: {
        bodyParser: false,
      },
  }