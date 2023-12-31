import { ABI } from "@/constants";
import { CONTRACT_ADDRESS, publicClient } from "@/libs/viem";
import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (!req.query.enCid) {
      throw new Error("enCID is not provided");
    }

    const encryptedCid = req.query.enCid as string;
    const contract = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "getContractByEncryptedCid",
      args: [encryptedCid],
    });

    return res.json({ hashedEmail: contract.hashedEmail });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}
