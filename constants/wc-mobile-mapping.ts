import { listings } from "./wc-mobile-listing.json";

class WCListingClass {
  WC_MOBILE_MAPPING: {
    [key: string]: {
      native: string;
      universal: string;
    };
  } = {};

  constructor() {
    const WC_MOBILE_MAPPING: {
      [key: string]: {
        native: string;
        universal: string;
      };
    } = {};
    Object.values(listings).forEach((listing) => {
      if (listing.mobile.native && listing.mobile.universal) {
        const protocol = listing.mobile.native.split("://")[0];
        WC_MOBILE_MAPPING[protocol] = listing.mobile;
      }
    });
    this.WC_MOBILE_MAPPING = WC_MOBILE_MAPPING;
  }
  getMobileUniversalLink(currentLink: string) {
    // okex://main
    if (!currentLink) return "";
    const [protocol] = currentLink.split("://");
    const existProtocol = this.WC_MOBILE_MAPPING[protocol];

    if (!existProtocol) return currentLink;

    const currentLinkQuery = currentLink.split("?")[1];

    const checkSource = existProtocol.universal[existProtocol.universal.length - 1] !== "/";

    return `${existProtocol.universal}${checkSource ? "/" : ""}wc?${currentLinkQuery}`;
  }
}

const WCListing = new WCListingClass();
export default WCListing;
