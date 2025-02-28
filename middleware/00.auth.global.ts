import { getUserInfo } from "~/services/api/auth/api";

const requiredAuthLayouts = ["conversation", "default", "home"];

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!to.meta.layout || to.meta.guest || !requiredAuthLayouts.includes(to.meta.layout)) return;
  const { setAccessToken, getAccessToken, setUser, getUser } = useAuthStore();
  const app = useAppSetting();
  const conversation = useConversationStore();
  let userInfo = getUser();
  if (getAccessToken()) {
    try {
      userInfo = await getUserInfo();
      if (!userInfo.privy_wallet) {
        throw new Error("");
      }
      setUser(userInfo);
    } catch (error) {
      localStorage.removeItem("access_token");

      return navigateTo("/auth/login");
    }
  } else if (to.name !== "index") {
    return navigateTo("/auth/login");
  }
  // if (to.name === "index") return navigateTo("/auth/login");
  if (to.meta.layout === "home") return;

  if (to.meta.layout === "conversation") {
    const route = useRoute();
    conversation.setConvID(route.params.conv_id as string);
    conversation.init().then(() => console.log("conversation.init completed"));
    usePortfolio()
      .init(true)
      .then(() => console.log("bnb.init completed"));
  }
});
