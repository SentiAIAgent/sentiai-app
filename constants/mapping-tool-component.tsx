import ItemBalanceGet from "~/components/chat/ItemBalanceGet.vue";
import ItemDeposit from "~/components/chat/ItemDeposit.vue";
import ItemDevCheck from "~/components/chat/ItemDevCheck.vue";
import ItemFindPool from "~/components/chat/ItemFindPool.vue";
import ItemFirstDegen from "~/components/chat/ItemFirstDegen.vue";
import ItemListPosition from "~/components/chat/ItemListPosition.vue";
import ItemPoolDetail from "~/components/chat/ItemPoolDetail.vue";
import ItemSecondDegen from "~/components/chat/ItemSecondDegen.vue";
import ItemSwapPreview from "~/components/chat/ItemSwapPreview.vue";
import ItemSwapResult from "~/components/chat/ItemSwapResult.vue";
import ItemTokenData from "~/components/chat/ItemTokenData.vue";
import ItemTokenHoldingByHolder from "~/components/chat/ItemTokenHoldingByHolder.vue";
import ItemTokenPrice from "~/components/chat/ItemTokenPrice.vue";
import ItemTokenSearch from "~/components/chat/ItemTokenSearch.vue";
import ItemTopHolder from "~/components/chat/ItemTopHolder.vue";
import ItemTopToken from "~/components/chat/ItemTopToken.vue";
import ItemWalletPorfolio from "~/components/chat/ItemWalletPorfolio.vue";

export const MAPPING_TOOL_COMPONENT = {
    tokensaddressprice_get: { name: "Search Token Price", component: ItemTokenPrice, binding: { token: "token", inputs: "inputs" } },
    bnb_quote_get: { name: "Preview Swap Detail", component: ItemSwapPreview },
    SentiAiTradingBalanceGet: { name: "Check Token Balance", component: ItemBalanceGet, binding: { inputs: "inputs" } },
    walletsaddressassets_get: { name: "Search Wallet Porfolio", component: ItemWalletPorfolio },
    SentiAiTradingQuoteExecutePost: { name: "Swap Token", component: ItemSwapResult },
    executetransactionpost: { name: "", component: ItemSwapResult },
    dataset_6dd7c1c4_7511_4408_947a_7543cce6ff08: { name: "Search Token Address", component: ItemTokenSearch },
    bnb_topholders_pnl_get: { name: "Scan Top Holders", component: ItemTopHolder },
    bnb_tokendata_get: { name: "Fetch Token Market Data", component: ItemTokenData, binding: { inputs: "inputs" } },
    "tokensaddressaggdev-check_get": { name: "Check Developer Profile", component: ItemDevCheck },
    bnb_topholders_portfolio_get: { name: "Get Holders Portfolio", component: ItemTokenHoldingByHolder },
    bnb_tokenstop_get: { name: "Search Top Tokens", component: ItemTopToken },
    degen_first_alert: { name: "", component: ItemFirstDegen, binding: { created_at: "created_at", "is-preview": "isPreview", inputs: "inputs" } },
    degen_second_alert: { name: "", component: ItemSecondDegen, binding: { created_at: "created_at", inputs: "inputs" } },
    dlmmpairsaddress_get: { name: "Search for DLMM pool details", component: ItemPoolDetail },
    dlmmpairs_get: { name: "Find DLMM pools on Meteora", component: ItemFindPool },
    dlmmwalletsaddresspositions_get: { name: "Find Position", component: ItemListPosition },
    dlmmactionsinit_post: { name: "Add Liquidity", component: ItemDeposit },
};
