import type { AppProps } from "next/app";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { useRef } from "react";
import LayoutContext from "@/context/LayoutContext";
import Head from "next/head";

export type AppPageProps = {
    title?: string;
    useTitleAffix?: boolean;
    redirectUrl?: string;
};

export default function App({ Component, pageProps }: AppProps<AppPageProps>) {
    const mainRef = useRef<HTMLElement>(null);

    const title = pageProps.title;
    const useTitleAffix = pageProps.useTitleAffix ?? true;

    return (
        <LayoutContext.Provider value={{ mainRef }}>
            <Head>
                <title>
                    {
                        title
                            ? useTitleAffix
                                ? `${title} - cck.wtf`
                                : title
                            : "cck.wtf"
                    }
                </title>
                {pageProps.redirectUrl
                    ? <meta http-equiv="refresh" content={`0; url=${pageProps.redirectUrl}`} />
                    : null
                }
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
