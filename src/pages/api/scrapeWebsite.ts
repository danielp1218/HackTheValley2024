import {scrape} from "@/utils/scrape";

export default async function handler(req, res) {
    const { url } = req.body;
    const result = await scrape(url);
    res.status(200).json(result);
}