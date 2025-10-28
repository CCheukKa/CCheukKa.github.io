import type { AppProps } from "next/app";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { useRef } from "react";
import LayoutContext from "@/context/LayoutContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    const mainRef = useRef<HTMLElement>(null);
    return (
        <LayoutContext.Provider value={{ mainRef }}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>
            <Header />
            <main ref={mainRef}>
                <Component {...pageProps} />
            </main>
        </LayoutContext.Provider>
    );
}
