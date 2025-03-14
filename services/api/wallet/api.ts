import Fetch from "..";

export async function postInitNewTransfer(body: { amount: number; token_address: string; to_address: string; from_address: string }): Promise<any> {
  try {
    const { data } = await Fetch.post<{ data: any }>(`@api/wallets/init-transfer`, body);
    return data.data;
  } catch (error: any) {
    console.error("postInitNewTransfer er", error);

    return null;
  }
}

export async function postExecuteTransfer(body: { transfer_id: string }): Promise<any> {
  try {
    const { data } = await Fetch.post<{ data: any }>(`@api/wallets/execute-transfer`, body);
    return data.data;
  } catch (error: any) {
    console.error("postExecuteTransfer er", error);

    return null;
  }
}

export async function postActiveWallet(body: { address: string }): Promise<any> {
  try {
    await Fetch.post<{ data: any }>(`@api/wallets/active`, body);
    return true;
  } catch (error: any) {
    console.error("postActiveWallet er", error);

    return false;
  }
}
