import Head from "next/head";

type RedirectProps = {
    url: string;
};
export default function Redirect({ url }: RedirectProps) {
    return (
        <Head>
            <meta http-equiv="refresh" content={`0; url=${url}`} />
        </Head>
    );
}