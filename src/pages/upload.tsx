import Redirect from "@/components/Redirect";
import Title from "@/components/Title";

export default function UploadPage() {
    return (
        <>
            <Title title="Redirecting to Upload Bin..." />
            <Redirect url="https://drive.google.com/drive/folders/1jRjz6vsuMw6qbJj893tLjG0ggUaFviqi" />
        </>
    );
}