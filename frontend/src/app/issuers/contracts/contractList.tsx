"use client";

import Spinner from "@/components/spinner";
import WorldCoinButton from "@/components/worldcoinButton";
import { ABI } from "@/constants";
import { CONTRACT_ADDRESS } from "@/libs/viem";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAccount, useContractRead } from "wagmi";

type Contract = {
  enCid: string;
  recipient: string;
  status: boolean;
};

type RowProps = {
  contract: Contract;
};

const Row = ({ contract }: RowProps) => {
  return (
    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-900">
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
      >
        {contract.enCid}
      </th>
      <td className="px-6 py-4">{contract.recipient}</td>
      <td className="px-6 py-4">
        {contract.status ? (
          <span className="rounded-lg bg-green-400 px-2 py-1 text-white">
            Signed
          </span>
        ) : (
          <span className="rounded-lg bg-primary-400 px-2 py-1 text-white">
            Pending
          </span>
        )}
      </td>
    </tr>
  );
};

const ContractList = () => {
  const { address } = useAccount();
  const { status } = useSession();

  const {
    data: contracts,
    isLoading,
    error,
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getContractsBySender",
    args: [address || "0x"],
  });

  useEffect(() => {
    if (error) toast.error(error?.message);
  }, [error]);

  if (status === "authenticated")
    return (
      <div className="mx-auto">
        <WorldCoinButton
          onClick={() => {
            signIn("worldcoin");
          }}
        />
      </div>
    );

  if (!address)
    return (
      <div className="mx-auto">
        <h2 className="text-center text-3xl font-bold">
          Please connect wallet first
        </h2>
      </div>
    );

  return (
    <div className="mx-auto w-3/4">
      <h2 className="mb-4 text-xl font-bold">Contract List</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Recipient
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {contracts &&
                contracts.map((contract) => (
                  <Row
                    contract={{
                      enCid: contract.encryptedCid,
                      recipient: contract.recipient,
                      status: contract.isSigned,
                    }}
                    key={contract.encryptedCid}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContractList;
