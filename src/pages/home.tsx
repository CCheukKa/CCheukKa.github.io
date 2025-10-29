import Shelf from "@/components/Shelf";
import { homeConfig } from "@/configs/homeConfig";
import titleCardStyles from "@/styles/titleCard.module.css";
import Title from "@/components/Title";

export default function HomePage() {
    return (
        <>
            <Title title="Home" />

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