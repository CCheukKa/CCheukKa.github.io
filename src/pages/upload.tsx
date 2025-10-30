import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";

export default function UploadPage() { }

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Redirecting to Upload Bin...",
            useTitleAffix: false,
            redirectUrl: "https://drive.google.com/drive/folders/1jRjz6vsuMw6qbJj893tLjG0ggUaFviqi",
        }
    };
};