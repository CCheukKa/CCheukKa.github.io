import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";

export default function DrivePage() { }

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Redirecting to Google Drive...",
            useTitleAffix: false,
            redirectUrl: "https://drive.google.com/drive/folders/1G90ViHPNzcKiZctXOfgRAjG0aT_OC3ID",
        }
    };
};