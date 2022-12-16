import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import cors from "cors";

const handler = nextConnect();

const produtoById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { to } = req.query;

  const data = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=02721100&destinations=${to}&key=AIzaSyBckVf20DMJcgsGUrMVjEhlkb9muWcw6sE`
  )
    .then((response) => response.json())
    .then((data) => data);

  console.log(data);

  return res.status(200).json({
    status: "ok",
    data,
  });
};

handler.use(cors());
handler.get(produtoById);

export default handler;
