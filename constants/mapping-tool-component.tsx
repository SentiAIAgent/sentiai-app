import ItemDevCheck from "~/components/chat/ItemDevCheck.vue";
import ItemSwapPreview from "~/components/chat/ItemSwapPreview.vue";
import ItemSwapResult from "~/components/chat/ItemSwapResult.vue";
import ItemTask from "~/components/chat/ItemTask.vue";
import ItemTokenData from "~/components/chat/ItemTokenData.vue";
import ItemTokenHoldingByHolder from "~/components/chat/ItemTokenHoldingByHolder.vue";
import ItemTokenPrice from "~/components/chat/ItemTokenPrice.vue";
import ItemTokenSearch from "~/components/chat/ItemTokenSearch.vue";
import ItemTopHolder from "~/components/chat/ItemTopHolder.vue";
import ItemTopToken from "~/components/chat/ItemTopToken.vue";
import ItemWalletPorfolio from "~/components/chat/ItemWalletPorfolio.vue";

export const MAPPING_TOOL_COMPONENT = {
    tokensaddressprice_get: { name: "Search Token Price", component: ItemTokenPrice, binding: { token: "token", inputs: "inputs" } },
    bnb_quote_get: { name: "Preview Swap Detail", component: ItemSwapPreview }, //
    walletsaddressassets_get: { name: "Search Wallet Porfolio", component: ItemWalletPorfolio }, //
    bnb_swap_execute: { name: "Swap Token", component: ItemSwapResult },
    executetransactionpost: { name: "", component: ItemSwapResult },
    dataset_6dd7c1c4_7511_4408_947a_7543cce6ff08: { name: "Find Token Address", component: ItemTokenSearch }, //
    bnb_topholders_pnl_get: { name: "Get Top Holders", component: ItemTopHolder }, //
    bnb_tokendata_get: { name: "Fetch Token Market Data", component: ItemTokenData, binding: { inputs: "inputs" } }, //
    "tokensaddressaggdev-check_get": { name: "Check Developer Profile", component: ItemDevCheck },
    bnb_topholders_portfolio_get: { name: "Get Holders Portfolio", component: ItemTokenHoldingByHolder }, //
    bnb_tokenstop_get: { name: "Find Token Lists", component: ItemTopToken }, //
    v1conversationsidtasks_get: { name: "View Task", component: ItemTask },
    v1conversationsidtasks_post: { name: "Create Task", component: ItemTask },
};
