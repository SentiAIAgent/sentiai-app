import { MAPPING_TOOL_COMPONENT } from "~/constants/mapping-tool-component";

export interface IChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  completed: boolean;
  data: {
    observations?: IObservation[];
    actions?: any;
    reply_message?: IChatMessage;
    executed_task?: ITaskBody;
  };
  created_at: string;
  type?: "chat" | "execute_task";
}

export type TAction = "agent_chat" | "url";

export interface IAction {
  label: string;
  type: TAction;
  params: any;
}

export interface IObservation {
  id: string;
  completed: boolean;
  tools: ITool[];
}

export type TToolID = keyof typeof MAPPING_TOOL_COMPONENT;

export interface ITool {
  id: TToolID;
  name: string;
  inputs: any;
  outputs: string; // jsonstringify
}

export interface IConversation {
  id: string;
  name: string;
  agent?: IAgent;
  config: {
    is_favorite: boolean;
    is_published: boolean;
    is_readonly: boolean;
    publish_mode: "execute_task_only" | "full";
  };
  is_readonly?: boolean;
  task_count: number;
  last_message_id?: string;
  last_read_id?: string;
}

export interface IAgent {
  id: string;
  name: string;
  description: string;
  avatar_url: string;
  metadata?: IAgentMetadata;
}

export interface IAgentMetadata {
  capabilities: { sub_title: string; title: string }[];
  suggested_messages: { message: string }[];
  socials: { icon_url: string; title: string; url: string }[];
}

export interface ITaskBody {
  id?: string;
  instruction: string;
  name: string;
  conversation_id?: string;
  status?: "active" | "paused";
  schedule: {
    at: string[];
    every: string;
    readable_text?: string;
    timezone?: string;
  };
}

export type TChatType = "private" | "channel" | "group" | "supergroup";

export interface ITelegramInte {
  bot_id: number;
  bot_token_hint: "string";
  bot_username: string;
  chat_id: number;
  chat_title: string;
  chat_type: TChatType;
  chat_username: string;
}

export interface ITwitterInte {}

export interface IIntegration {
  id: string;
  created_at: string;
  provider: "telegram" | "twitter";
  status: "active" | "inactive";
  data: ITelegramInte & ITwitterInte;
}
