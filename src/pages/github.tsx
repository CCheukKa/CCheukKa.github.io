import Redirect from "@/components/Redirect";
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";

export default function GitHubPage() {
    return (
        <>
            <Redirect url="https://github.com/CCheukKa" />
        </>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Redirecting to GitHub...",
            useTitleAffix: false
        }
    };
};