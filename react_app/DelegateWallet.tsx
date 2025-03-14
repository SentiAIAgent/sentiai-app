import React, { useEffect } from "react";
import { usePrivy, useDelegatedActions } from "@privy-io/react-auth";

export default function ({
    onSuccess,
    onError,
    type = "delegate",
}: {
    type?: "revoke" | "delegate";
    onSuccess: () => void;
    onError: (error?: any) => void;
}) {
    const { user } = usePrivy();
    const { delegateWallet, revokeWallets } = useDelegatedActions();
    useEffect(() => {
        onDelegate();
    }, []);

    async function onDelegate() {
        if (!user?.wallet) {
            return onError("No wallet connected");
        }
        try {
            console.log("type", type);
            if (type === "delegate") await delegateWallet({ address: user.wallet.address, chainType: "ethereum" });
            else await revokeWallets();
            onSuccess();
        } catch (error) {
            onError(error);
        }
    }

    return null;
}
