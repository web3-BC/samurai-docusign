import { keccak256 } from "viem";

export const hashEmail = (email: string) => {
  return keccak256(`0x${email}`);
};
