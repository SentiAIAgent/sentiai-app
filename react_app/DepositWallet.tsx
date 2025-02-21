import React, { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useFundWallet } from "@privy-io/react-auth";

export default function ({ onSuccess, onError }: { onSuccess: () => void; onError: (error?: any) => void }) {
    const { user } = usePrivy();

    const { fundWallet } = useFundWallet();
    useEffect(() => {
        onFund();
    }, []);

    async function onFund() {
        if (!user?.wallet) {
            return onError("No wallet connected");
        }
        try {
            await fundWallet(user.wallet.address);
            onSuccess();
        } catch (error) {
            console.log("erorr", error);
            onError(error);
        }
    }

    return null;
}
