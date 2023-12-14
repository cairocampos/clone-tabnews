import { NextApiResponse, NextApiRequest } from "next";

function status(request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json({
    chave: "Valor",
  });
}

export default status;
