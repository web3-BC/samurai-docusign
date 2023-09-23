import { getEmailFromUserId, getUserIdFromJwt } from "@/libs/privy";
import { hashEmail } from "@/utils";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (!req.query.jwt) {
      throw new Error("jwt is not provided");
    }

    const userId = await getUserIdFromJwt(req.query.jwt as string);

    if (!userId) {
      throw new Error("userId is undefined");
    }

    const email = await getEmailFromUserId(userId);
    console.log("email: ", email);

    const hashedEmail = hashEmail(email);

    return res.json({ hashedEmail });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}