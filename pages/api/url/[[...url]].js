import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getUrl(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}
async function getUrl(req, res) {
  console.log("req.query", req.query);
  const query = req.query;
  try {
    if (Object.keys(query).length === 0 && query.constructor === Object) {
      res.redirect(307, "/");
    }

    if (query.url.length > 1) {
      res.redirect(307, "/");
    }

    const result = await prisma.uRL.findFirst({
      where: {
        setUrl: { contains: query.url[0] },
      },
    });

    if (result === null) {
      res.redirect(307, "/");
    } else {
      res.redirect(307, result.redirectUrl);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error reading from DB", success: false });
  }
}
