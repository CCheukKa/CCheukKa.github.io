import type { AppProps } from "next/app";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { useRef } from "react";
import LayoutContext from "@/context/LayoutContext";

export default function App({ Component, pageProps }: AppProps) {
    const mainRef = useRef<HTMLElement>(null);
    return (
        <LayoutContext.Provider value={{ mainRef }}>
            <Header />
            <main ref={mainRef}>
                <Component {...pageProps} />
            </main>
        </LayoutContext.Provider>
    );
}
