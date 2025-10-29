import Shelf from "@/components/Shelf";
import { homeConfig } from "@/configs/homeConfig";
import titleCardStyles from "@/styles/titleCard.module.css";
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";

export default function HomePage() {
    return (
        <>
            <HomeTitleCard />
            <Shelf shelfConfig={homeConfig} />
        </>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Home",
        }
    };
}

/* -------------------------------------------------------------------------- */

function HomeTitleCard() {
    return (
        <div className={titleCardStyles.titleCard}>
        </div>
    );
}