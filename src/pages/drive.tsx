import Redirect from "@/components/Redirect";
import Title from "@/components/Title";

export default function DrivePage() {
    return (
        <>
            <Title title="Redirecting to Google Drive..." />
            <Redirect url="https://drive.google.com/drive/folders/1G90ViHPNzcKiZctXOfgRAjG0aT_OC3ID" />
        </>
    );
}