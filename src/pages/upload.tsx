import Redirect from "@/components/Redirect";
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";

export default function UploadPage() {
    return (
        <>
            <Redirect url="https://drive.google.com/drive/folders/1jRjz6vsuMw6qbJj893tLjG0ggUaFviqi" />
        </>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Redirecting to Upload Bin...",
            useTitleAffix: false
        }
    };
};