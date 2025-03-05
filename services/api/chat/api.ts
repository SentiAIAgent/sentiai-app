import Fetch from "..";
import { IAgent, IChatMessage, IConversation, ITaskBody } from "./type";

export async function createNewConversation(agent_id?: string): Promise<any> {
  try {
    const { data } = await Fetch.post<{ data: any }>(`@api/conversations/new`, {
      agent_id,
    });
    return data.data;
  } catch (error: any) {
    console.error("createNewConversation er", error.response.status);

    return null;
  }
}

export async function findConversationById(id: string): Promise<IConversation | undefined> {
  try {
    const { data } = await Fetch.get<{ data: IConversation }>(`@api/conversations/${id}`);
    return data.data;
  } catch (error: any) {
    console.error("findConversationById er", error.response.status);

    return undefined;
  }
}

export async function findPublicConversationById(id: string): Promise<IConversation | undefined> {
  try {
    const { data } = await Fetch.get<{ data: IConversation }>(`@api/public/conversations/${id}`);
    return data.data;
  } catch (error: any) {
    console.error("findPublicConversationById er", error.response.status);

    return undefined;
  }
}

export async function fetchPublicChatHistory(
  conv_id: string,
  params: {
    first_message_id?: string;
    last_message_id?: string;
  } = {}
): Promise<IChatMessage[]> {
  try {
    const { data } = await Fetch.get<{ data: IChatMessage[] }>(`@api/public/conversations/${conv_id}/history`, {
      params: {
        ...params,
        limit: 20,
      },
    });
    return data.data;
  } catch (error: any) {
    console.error("fetchChatHistory er", error.response.status);

    return [];
  }
}

export async function fetchChatHistory(
  conv_id: string,
  params: {
    first_message_id?: string;
    last_message_id?: string;
  } = {}
): Promise<IChatMessage[]> {
  try {
    const { data } = await Fetch.get<{ data: IChatMessage[] }>(`@api/conversations/${conv_id}/history`, {
      params: {
        ...params,
        limit: 20,
      },
    });
    return data.data;
  } catch (error: any) {
    console.error("fetchChatHistory er", error.response.status);

    return [];
  }
}

export async function fetchConversations(): Promise<IConversation[]> {
  try {
    const { data } = await Fetch.get<{ data: IConversation[] }>(`@api/conversations`);
    return data.data;
  } catch (error: any) {
    console.error("fetchConversations er", error.response.status);

    return [];
  }
}

export async function deleteConversationById(id: string): Promise<boolean> {
  try {
    const { data } = await Fetch.delete<{ data: IConversation }>(`@api/conversations/${id}`);
    return true;
  } catch (error: any) {
    console.error("findConversationById er", error.response.status);
    return false;
  }
}

export async function fetchListAgents(): Promise<IAgent[]> {
  try {
    const { data } = await Fetch.get<{ data: IAgent[] }>(`@api/agents`);
    return data.data;
  } catch (error: any) {
    console.error("fetchListAgents er", error);

    return [];
  }
}

export async function fetchListChannel(): Promise<IConversation[]> {
  try {
    const { data } = await Fetch.get<{ data: IConversation[] }>(`@api/channels`);
    return data.data;
  } catch (error: any) {
    console.error("fetchListChannel er", error);

    return [];
  }
}

export async function findDepositAction(id: string): Promise<any | undefined> {
  try {
    const { data } = await Fetch.get<{ data: any }>(`@api/dlmm/actions/${id}`);
    return data.data;
  } catch (error: any) {
    console.error("findDepositAction er", error.response.status);

    return undefined;
  }
}

export async function updateDepositAction(id: string, body: any): Promise<any | undefined> {
  try {
    const { data } = await Fetch.put<{ data: any }>(`@api/dlmm/actions/${id}`, {
      actionID: id,
      data: body,
    });
    return data.data;
  } catch (error: any) {
    console.error("findDepositAction er", error.response.status);

    return undefined;
  }
}

export async function executeDepositAction(id: string, body: any): Promise<any | undefined> {
  try {
    const { data } = await Fetch.put<{ data: any }>(`@api/dlmm/actions/execute`, {
      action_id: id,
      dry_run: true,
    });
    return data.data;
  } catch (error: any) {
    console.error("findDepositAction er", error.response.status);

    return undefined;
  }
}

export async function getPairDetail(pair_address: string): Promise<any | undefined> {
  try {
    const rs = await fetch(`https://dlmm-api.meteora.ag/pair/${pair_address}`, {
      method: "GET",
    });
    const data = await rs.json();
    return data;
  } catch (error: any) {
    console.error("getPairDetail er", error.response.status);

    return undefined;
  }
}

export async function getListConvTask(conv_id: string): Promise<any | undefined> {
  try {
    const { data } = await Fetch.get<{ data: any }>(`@api/conversations/${conv_id}/tasks`, {
      method: "GET",
    });
    return data.data;
  } catch (error: any) {
    console.error("getListConvTask er", error.response.status);

    return undefined;
  }
}
export async function getTaskById(conv_id: string, task_id: string): Promise<any | undefined> {
  try {
    const { data } = await Fetch.get<{ data: any }>(`@api/conversations/${conv_id}/tasks/${task_id}`);
    return data.data;
  } catch (error: any) {
    console.error("getTaskById er", error.response.status);

    return undefined;
  }
}

export async function postUpdateTask({ conv_id, id, body }: { conv_id: string; id: string; body: ITaskBody }): Promise<ITaskBody | null> {
  try {
    const { data } = await Fetch.put<{ data: any }>(`@api/conversations/${conv_id}/tasks/${id}`, body);
    return data.data;
  } catch (error: any) {
    console.error("findDepositAction er", error.response.status);

    return null;
  }
}

export async function postUpdateTaskStatus({
  conv_id,
  id,
  status,
}: {
  conv_id: string;
  id: string;
  status: "paused" | "active";
}): Promise<ITaskBody | null> {
  try {
    const { data } = await Fetch.put<{ data: any }>(`@api/conversations/${conv_id}/tasks/${id}/status`, {
      status,
    });
    return data.data;
  } catch (error: any) {
    console.error("findDepositAction er", error.response.status);

    return null;
  }
}
