import { NextApiRequest, NextApiResponse } from "next";
import pdfParse from "pdf-parse";

type PdfParseResponse = {
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Please use POST." });
    return;
  }

  const { file } = req.body;
  if (!file) {
    res.status(400).json({ error: "Missing file in request body." });
    return;
  }

  try {
    const dataBuffer = Buffer.from(file, "base64");
    const data: PdfParseResponse = await pdfParse(dataBuffer);
    res.status(200).json({ text: data.text });
  } catch (err) {
    res.status(500).json({ error: "Failed to extract text from PDF." });
    // throw new Error(err);
    throw new Error("Failed to extract text from PDF.");
  }
}
