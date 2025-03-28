import { defineStore } from "pinia";
import { toast } from "~/components/ui/toast";
import { createNewConversation, deleteConversationById, fetchConversations, findConversationById } from "~/services/api/chat/api";
import { IAgent, IChatMessage, IConversation } from "~/services/api/chat/type";

type ConversationState = {
  histories: IConversation[];
  conv?: IConversation;
  convID?: string;
  currentMessage: string;
  messages: IChatMessage[];
  currentAgent?: IAgent;
  disableAction: boolean;
  hideChat: boolean;
  showUserContent: boolean;
  dataToChat: {
    content: string;
    data: {
      action: string;
      params: any;
    };
  } | null;
};

export const useConversationStore = defineStore("conversations", {
  state: (): ConversationState => ({
    histories: [],
    conv: undefined,
    convID: undefined,
    currentMessage: "",
    messages: [],
    currentAgent: undefined,
    disableAction: false,
    hideChat: false,
    dataToChat: null,
    showUserContent: true,
  }),
  actions: {
    setMessages(messages: IChatMessage[]) {
      this.messages = messages;
    },
    setDisableAction(value: boolean) {
      this.disableAction = value;
    },
    setHideChat(value: boolean) {
      this.hideChat = value;
    },
    addMessage(message: IChatMessage) {
      this.messages.push(message);
    },
    setCurrentAgent(agent?: IAgent) {
      this.messages = [];
      this.currentAgent = agent;
    },
    async newConversation(agent_id?: string) {
      const app = useAppSetting();
      app.changeLoading(true);
      const selectAgent = agent_id || this.currentAgent?.id || app.agents[0].id;
      const conv = await createNewConversation(selectAgent);
      if (conv) {
        this.change(conv, true);
      }
      setTimeout(() => {
        app.changeLoading(false);
      }, 200);
    },
    resetConv() {
      this.conv = undefined;
    },
    setCurrentMessage(content: string) {
      this.currentMessage = content;
    },
    updateCurrentChat() {
      if (!this.conv) return;
      this.histories = this.histories.filter((item) => item.id !== this.conv?.id);
      this.histories.unshift(this.conv);
    },
    setConvID(id: string) {
      this.convID = id;
    },
    async changeWithId(id: string) {
      this.convID = id;
      this.init();
    },
    async init(conv?: IConversation) {
      this.messages = [];
      if (!this.histories.length) {
        this.histories = await fetchConversations();
      }

      if (!conv && this.convID) {
        conv = await findConversationById(this.convID);
      }
      if (conv) {
        return this.change(conv);
      }
    },
    change(conv?: IConversation, addNew?: boolean, newTab?: boolean) {
      const route = useRoute();

      if (!conv) {
        this.convID = "";
        this.conv = { agent: this.currentAgent, name: "New Chat" } as any;
        return route.path.startsWith("/c") ? window.history.replaceState({}, "", `/c`) : navigateTo("/c");
      }
      if (addNew) this.histories.unshift(conv);
      else {
        let existIndex = this.histories.findIndex((item) => item.id === conv.id);
        if (existIndex > -1) this.histories[existIndex] = conv;
      }

      this.conv = conv;
      this.convID = conv.id;
      if (conv) {
        route.path.startsWith("/c") ? window.history.replaceState({}, "", `/c/${conv.id}`) : navigateTo(`/c/${conv.id}`);
      }
    },
    async delete(deleteItem: IConversation) {
      const app = useAppSetting();
      app.changeLoading(true);
      const rs = await deleteConversationById(deleteItem.id);
      if (rs) {
        this.histories = this.histories.filter((item) => item.id !== deleteItem.id);
        if (deleteItem.id === this.conv?.id) {
          this.conv && window.history.replaceState({}, "", `/c`);
          this.conv = undefined;
          navigateTo("/c");
        }
      } else {
        toast({
          description: "Delete conversation failer",
          duration: 3000,
        });
      }
      setTimeout(() => app.changeLoading(false), 300);
    },
  },
});
