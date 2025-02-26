import React, { useEffect } from "react";
import { usePrivy, useIdentityToken } from "@privy-io/react-auth";

export default function ({ children, onSuccess }: { children: React.ReactNode; onSuccess: (id_token: string) => void }) {
    const { user, logout, getAccessToken } = usePrivy();

    async function onClick() {
        localStorage.removeItem("access_token");
        if (user) {
            try {
                await logout();
            } catch (error) {}
        }
        window.location.href = "/auth/login";
    }
    return (
        <div class={"py-2 font-[500] cursor-pointer row-center hover:bg-app-card12"} onClick={onClick}>
            <span class="flex-1 text-[red]">Logout</span>
        </div>
    );
}
