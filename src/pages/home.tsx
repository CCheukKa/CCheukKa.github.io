import Head from "next/head";
import Shelf from "@/components/Shelf";
import { homeConfig } from "@/configs/homeConfig";
import titleCardStyles from "@/styles/titleCard.module.css";

export default function HomePage() {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <HomeTitleCard />

            <Shelf shelfConfig={homeConfig} />
        </>
    );
}

/* -------------------------------------------------------------------------- */

function HomeTitleCard() {
    return (
        <div className={titleCardStyles.titleCard}>

        </div>
    );
}