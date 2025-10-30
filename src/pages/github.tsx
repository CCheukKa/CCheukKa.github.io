import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";

export default function GitHubPage() { }

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Redirecting to GitHub...",
            useTitleAffix: false,
            redirectUrl: "https://github.com/CCheukKa",
        }
    };
};