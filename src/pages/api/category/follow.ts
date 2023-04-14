import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"
import clientPromise from "../../../../lib/mongodb";


import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    const user_id = session.user.sub;
    const category_name = JSON.parse(req.body)["category_name"]
    const client = await clientPromise;
    const db = client.db("yeddi");
    const query = await db.collection("users").updateOne({_id: user_id}, {$push: {followed: category_name}});
    res.send({"message": "received"})
}