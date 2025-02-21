import React, { useEffect } from "react";
import { useLogin, LoginModal, usePrivy, useDelegatedActions, useIdentityToken } from "@privy-io/react-auth";

export default function ({ children, onSuccess }: { children: React.ReactNode; onSuccess: (id_token: string) => void }) {
    const { user, login, logout } = usePrivy();
    const { identityToken } = useIdentityToken();

    useEffect(() => {
        if (identityToken && user && user.wallet) {
            localStorage.setItem("privy_address", user.wallet?.address || "");
            onSuccess(identityToken);
        }
    }, [identityToken, user]);

    async function onClick() {
        if (user) {
            await logout();
        }
        return login();
    }
    return (
        <button
            onClick={onClick}
            class={
                "flex items-center justify-center   py-[12px] text-[16px] text-app-text1 font-[600] rounded-[16px] border-[1px] border-[#ffffff1a]"
            }
            style={{ width: "100%", marginTop: "16px", background: "#FCD535" }}
        >
            Login to Chat
        </button>
    );
}
