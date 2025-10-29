import Head from "next/head";
import Shelf from "@/components/Shelf";
import TitleCard from "@/components/TitleCard";
import { plasticityConfig } from "@/configs/plasticityConfig";

export default function PlasticityPage() {
    return (
        <>
            <Head>
                <title>Plasticity</title>
            </Head>

            <TitleCard
                title="Plasticity"
                flavourText="Random dumb pieces of texts I sometimes write"
                description={
                    "Sometimes I just couldn't help myself when some obscure inspiration strikes; I would find myself writing non-stop. The topics they explore are as random and disorganised as can be."
                    + "\n" +
                    "Simply put, these are all just low-quality brain vomits and aimless rambles with little regard for grammar."
                }
            />

            <Shelf shelfConfig={plasticityConfig} />
        </>
    );
}