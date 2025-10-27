import Shelf from "@/components/Shelf";
import { homeConfig } from "@/configs/homeConfig";
import titleCardStyles from "@/styles/titleCard.module.css";
import styles from "@/styles/home.module.css";

export default function HomePage() {
    return (
        <>
            <title>Home</title>

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