import Head from "next/head";

type TitleProps = {
    title: string;
    useAffix?: boolean;
};
export default function Title({ title, useAffix: usePrefix = true }: TitleProps) {
    return (
        <Head>
            <title>{usePrefix ? `${title} - cck.wtf` : title}</title>
        </Head>
    );
}