import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma/connection";

export const dynamic = "force-dynamic";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
    
  if(req.method == "GET"){ //Get post from database

    const slug = String(req.query.id)

     const post = await prisma.post.findFirst({
      where: {
        slug: slug
      }
    });

    return res.status(200).json(post);
  }else{
    //TODO: Modify and delete entries with PUT and DELETE
    return res.status(405).send({message:"Method not allowed"});
  }
 
}
