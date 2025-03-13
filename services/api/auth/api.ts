import Fetch from "..";
import { IIntegration } from "../chat/type";
import { IAuthLimit, IUserProfile } from "./type";

export async function loginWithProvider(provider: "google" | "privy", params: any): Promise<IAuthLimit> {
  try {
    const { data } = await Fetch.post<{ data: IAuthLimit }>(`@api/auth/login`, {
      data: params,
      provider,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    return data.data;
  } catch (error: any) {
    console.error("loginByProject er", error.response.status);

    return { access_token: "", id: "", status: error?.response?.status || 500 };
  }
}

export async function getUserInfo(): Promise<IUserProfile> {
  try {
    const { data } = await Fetch.get<{ data: IUserProfile }>(`@api/users/profile`);

    return data.data;
  } catch (error) {
    console.log("getUserInfo er", error);
    return { name: "" } as IUserProfile;
  }
}

export async function getSubscriptionPrice() {
  try {
    const { data } = await Fetch.get<{ data: { extra_balance: number; price: number } }>(`@api/subscriptions/price`);

    return data.data;
  } catch (error) {
    console.log("getSubscriptionPrice er", error);
    return { price: 0, extra_balance: 0 };
  }
}

export async function payToJoinSubscription() {
  try {
    const { data } = await Fetch.post<{ data: { status: "pending"; tx_signature: string } }>(`@api/subscriptions/buy`, {});
    return data;
  } catch (error: any) {
    console.error("payToJoinSubscription er", error.response.status);

    return null;
  }
}

export async function fetchOAuthTwitterLink() {
  try {
    const { data } = await Fetch.post<{ data: { url: string } }>(`@api/integrations/twitter`, {
      return_url: `${window.location.origin}/profile`,
    });
    return data.data;
  } catch (error: any) {
    console.error("fetchOAuthTwitterLink er", error.response.status);

    return null;
  }
}

export async function fetchAllIntergrations() {
  try {
    const { data } = await Fetch.get<{ data: IIntegration[] }>(`@api/integrations`);
    return data.data;
  } catch (error: any) {
    console.error("fetchAllIntergrations er", error.response.status);

    return [];
  }
}

export async function postIntergrationTelegram(body: { bot_token: string; chat_id: Number }) {
  try {
    const { data } = await Fetch.post<{ data: any }>(`@api/integrations`, {
      provider: "telegram",
      data: body,
    });
    return data.data;
  } catch (error: any) {
    console.error("postIntergrationTelegram er", error.response.status);

    return null;
  }
}
