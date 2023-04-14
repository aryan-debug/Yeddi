import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"
import clientPromise from "../../../../lib/mongodb";

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if(session){
        try{
            const client = await clientPromise;
            const db = client.db("yeddi");
            await db.collection("categories").insertOne({name: req.body.name, posts: []})
        }
        catch (e){
            console.log(`Error: ${e}`);
        }

        res.send({message: "You are autheticated"})
    }
    else{
        res.send({message: "Not Authenticated."});
    }
}