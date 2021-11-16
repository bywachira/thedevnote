import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const client = axios.create({
    baseURL: `https://api.notion.com/v1`,
    headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        "Notion-Version": "2021-08-16"
    }
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { slug } = req.query;
        try {
            const response = await client.get(`/blocks/${slug}`)

            return res.status(200).json(response.data);
        } catch (error: any) {
            console.log(error)
            return res.status(404).json(error.response.data);
        }
    }
}