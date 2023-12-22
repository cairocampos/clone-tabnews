import database from "../../../../infra/database";

import { NextApiResponse, NextApiRequest } from "next";

async function status(request: NextApiRequest, response: NextApiResponse) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  response.status(200).json({
    chave: "Valor",
  });
}

export default status;
