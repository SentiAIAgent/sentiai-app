import React from "react";
import { PrivyProvider } from "@privy-io/react-auth";

export default function ({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            appId={AppConfig.env.PRIVY_APP_ID}
            clientId={AppConfig.env.PRIVY_CLIENT_ID}
            config={{
                // Customize Privy's appearance in your app
                appearance: {
                    theme: "light",
                    accentColor: "#676FFF",
                    logo: "/images/icon-logo-row.svg",
                },
                loginMethods: ["google", "twitter", "email"],

                // Create embedded wallets for users who don't have a wallet
                embeddedWallets: {
                    showWalletUIs: true,
                    ethereum: {
                        createOnLogin: "users-without-wallets",
                    },
                },
            }}
            children={children}
        />
    );
}
