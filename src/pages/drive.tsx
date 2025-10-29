import Redirect from "@/components/Redirect";
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";

export default function DrivePage() {
    return (
        <>
            <Redirect url="https://drive.google.com/drive/folders/1G90ViHPNzcKiZctXOfgRAjG0aT_OC3ID" />
        </>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Redirecting to Google Drive...",
            useTitleAffix: false
        }
    };
};