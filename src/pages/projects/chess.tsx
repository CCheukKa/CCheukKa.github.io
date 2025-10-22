import Shelf from "@/components/shelf";
import TitleCard from "@/components/titleCard";
import { chessProjectsConfig } from "@/configs/chessProjectsConfig";

export default function ChessProjectsPage() {
    return (
        <>
            <title>Chess Projects</title>

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