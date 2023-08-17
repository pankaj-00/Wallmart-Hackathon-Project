import { Request, Response } from "express";
// import { convAgent } from "../utils/convAgent";
import { pyAgent, completeResult } from "../utils/convAgent2";

async function convAI(req:Request, res:Response){
    const query = req.body?.query;
    console.log("Incoming Query: ", query);
    await pyAgent(query);
    const result = await completeResult();
    console.log("Sending results...");
    console.log("Results sent");
    res.send({result:result});
}

export default convAI;