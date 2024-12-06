import { useEffect, useState } from "react";
import { TonDemo } from "../contracts/TonDemo";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "ton-core";

export function useMainContract() {
  const client = useTonClient();
  const [contractData, setContractData] = useState<null | {
    id: number;
    counter: number;
  }>();

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new TonDemo(
      Address.parse("EQD-9forbsMykXKBPBZ301v9bpVC1SFEgQK7Syv4uFHii-sl") // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<TonDemo>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;
      setContractData(null);
      const id = await mainContract.getID();
      const counter = await mainContract.getCounter();

      setContractData({
        id: id,
        counter:counter,
      });
    }
    getValue();
  }, [mainContract]);

  return {
    contract_address: mainContract?.address.toString(),
    ...contractData,
  };
}