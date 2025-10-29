import type { AppProps } from "next/app";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { useRef, useMemo } from "react";
import LayoutContext from "@/context/LayoutContext";
import Head from "next/head";
import { useRouter } from "next/router";

export type AppPageProps = {
    title?: string;
    useTitleAffix?: boolean;
    redirectUrl?: string;
};

export default function App({ Component, pageProps }: AppProps<AppPageProps>) {
    const mainRef = useRef<HTMLElement>(null);
    const router = useRouter();

    // Calculate path from router.asPath (includes actual slug values)
    const absoluteRefPath = useMemo(() => {
        // Use asPath to get the actual URL with slug values
        const pathname = router.asPath.split('?')[0].split('#')[0]; // Remove query params and hash
        const segments = pathname
            .split('/')
            .filter(s => s);
        return segments.length === 0 ? ['home'] : segments;
    }, [router.asPath]);

    const currentPageRefName = absoluteRefPath[absoluteRefPath.length - 1];

    const title = pageProps.title;
    const useTitleAffix = pageProps.useTitleAffix ?? true;

    const titleTag = (
        <title>
            {
                title
                    ? useTitleAffix
                        ? `${title} - cck.wtf`
                        : title
                    : "cck.wtf"
            }
        </title>
    );

    if (pageProps.redirectUrl) {
        return (
            <Head>
                {titleTag}
                <meta httpEquiv="refresh" content={`0; url=${pageProps.redirectUrl}`} />
            </Head>
        );
    }

    return (
        <LayoutContext.Provider value={{ mainRef, currentPageRefName, absoluteRefPath }}>
            <Head>
                {titleTag}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <meta name="view-transition" content="same-origin" />
            </Head>
            <Header />
            <main ref={mainRef}>
                <Component {...pageProps} />
            </main>
        </LayoutContext.Provider>
    );
}