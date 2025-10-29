import Title from "@/components/Title"
import Head from "next/head"

export default function GitHubPage() {
    return (
        <>
            <Title title="Redirecting to GitHub..." />
            <Head>
                <meta http-equiv="refresh" content="0; url=https://github.com/CCheukKa" />
            </Head>
        </>
    );
}