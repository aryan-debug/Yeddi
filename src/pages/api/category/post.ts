import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from "formidable";
import { authOptions } from "../auth/[...nextauth]"
import clientPromise from "../../../../lib/mongodb";
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const session = await getServerSession(req, res, authOptions);
  if(session){
    const form = new formidable.IncomingForm({keepExtensions: true, uploadDir: "./public/uploads"});
    form.parse(req, async (err, fields, files) => {
      try{
        if(fields.file != 'undefined'){
          const client = await clientPromise;
          const db = client.db("yeddi");
          const { categoryName } = fields;
          const file = files.file;
          db.collection("categories").updateOne({name: categoryName}, {$push: {"posts": file.newFilename}})
        } 
      } 
      catch(e){
        console.log(e);
        res.status(500).send({"message": "An error occured while uploading the file"})
      }
    });
  }
  res.status(401).send({"message": "Unauthorized"});
}

export const config = {
    api: {
        bodyParser: false,
      },
  }