// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import metadata from  "../json/_metadata.json";
import {tokenUri} from '../../../lib/contractMethods';
export default async function handler(req, res) {
   const {id} =req.query;
   try {
        
        const tokenId = parseInt(id.split('.json')[0]);
        console.log(tokenId, metadata[tokenId])
        await tokenUri(tokenId);
        res.status(200).json(metadata[tokenId]);

   } catch (error) {
    console.log(error);
    res.status(400).send("Server internal error");
   }
   
  }
  