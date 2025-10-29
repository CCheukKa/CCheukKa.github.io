import Title from "@/components/Title";
import Head from "next/head"

export default function DrivePage() {
    return (
        <>
            <Title title="Redirecting to Google Drive..." />
            <Head>
                <meta http-equiv="refresh" content="0; url=https://drive.google.com/drive/folders/1G90ViHPNzcKiZctXOfgRAjG0aT_OC3ID" />
            </Head>
        </>
    );
}