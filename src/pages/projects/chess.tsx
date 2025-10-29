import Shelf from "@/components/Shelf";
import TitleCard from "@/components/TitleCard";
import { chessProjectsConfig } from "@/configs/chessProjectsConfig";
import Title from "@/components/Title";

export default function ChessProjectsPage() {
    return (
        <>
            <Title title="Chess Projects" />

            <TitleCard
                title="Chess projects"
                flavourText="A couple random chess things I have done"
                description={
                    "They are all abandoned for one reason or another, I'm not even sure they actually work. If you don't see the pieces, just click on where the pieces would be and they should reappear just fine."
                    + "\n" +
                    "The chinese chess pieces are romanised, if you can't tell."
                }
            />

            <Shelf shelfConfig={chessProjectsConfig} />
        </>
    );
}