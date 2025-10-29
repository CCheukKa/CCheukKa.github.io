import Title from "@/components/Title";
import Head from "next/head"

export default function UploadPage() {
    return (
        <>
            <Title title="Redirecting to Upload Bin..." />

            <Head>
                <meta http-equiv="refresh" content="0; url=https://drive.google.com/drive/folders/1jRjz6vsuMw6qbJj893tLjG0ggUaFviqi" />
            </Head>
        </>
    );
}