import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";

export default function DrivePage() { }

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Curriculum Vitae",
            redirectUrl: "/curriculum-vitae"
        }
    };
};