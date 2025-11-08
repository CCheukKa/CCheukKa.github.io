import ContentFrame from "@/components/ContentFrame";
import TitleCard from "@/components/TitleCard";
import { chessProjectsConfig } from "@/configs/chessProjectsConfig";
import { GetStaticProps } from "next";
import { AppPageProps } from "../_app";

export default function ChessProjectsPage() {
    return (
        <>
            <TitleCard
                title="Chess projects"
                flavourText="A couple random chess things I have done"
                description={
                    "They are all abandoned for one reason or another, I'm not even sure they actually work. If you don't see the pieces, just click on where the pieces would be and they should reappear just fine."
                    + "\n" +
                    "The chinese chess pieces are romanised, if you can't tell."
                }
            />

            <ContentFrame shelfConfig={chessProjectsConfig} />
        </>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Chess Projects"
        }
    };
};