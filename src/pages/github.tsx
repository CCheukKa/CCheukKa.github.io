import Redirect from "@/components/Redirect";
import Title from "@/components/Title";

export default function GitHubPage() {
    return (
        <>
            <Title title="Redirecting to GitHub..." />
            <Redirect url="https://github.com/CCheukKa" />
        </>
    );
}