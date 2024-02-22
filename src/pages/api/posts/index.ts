import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma/connection";

export const dynamic = "force-dynamic";

function slugify(str:string) {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
    .substring(0,200) // max slug length
  
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
    
  if(req.method == "GET"){ //Get post from database
     const posts = await prisma.post.findMany({
      where: {
        published: true
      },
      orderBy: {
        created_at:'desc'
      }
    });
   
    return res.status(200).json(posts);
  }else if(req.method == "POST"){//Add entries, save it on database
    const { title, author, body } = req.body;
    
    if(!title || !author || !body){
      return res.status(400).send({message:"Titulo, autor y contenido son requeridos"})
    }

    const slug = slugify(title);
    let slugUsed = await prisma.post.findFirst({
      where: {
        slug: slug,
      },
    });

    if(slugUsed){
      return res.status(400).send({message: "Nombre de post ya utilizado"});
    }

    //Insert element into database
    const result = await prisma.post.create({
      data: {
        title: title,
        body: body,
        author: author,
        slug,
        created_at: new Date()
      },
    });
    return res.json(result);
  }else{
    //TODO: Modify and delete entries with PUT and DELETE
    return res.status(405).send({message:"Method not allowed"});
  }
 
}
