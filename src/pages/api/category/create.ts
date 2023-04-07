import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"
import clientPromise from "../../../../lib/mongodb";

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    if(session){
        res.send({message: "You are autheticated"})
    }
    else{
        res.send({message: "Not Authenticated."});
    }
}