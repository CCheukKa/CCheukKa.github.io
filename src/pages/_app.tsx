import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <div style={{ width: "100%", flexGrow: 1 }}>
                <Component {...pageProps} />
            </div>
        </>
    );
}
