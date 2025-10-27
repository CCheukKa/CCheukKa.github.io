import Shelf from "@/components/Shelf";
import TitleCard from "@/components/TitleCard";
import { projectsConfig } from "@/configs/projectsConfig";

export default function ProjectsPage() {
    return (
        <>
            <title>Projects</title>

            <TitleCard
                title="Projects"
                flavourText="Some random coding projects I have done in the past"
                description={
                    "This is only the tip of the iceberg. Check out <a href=\"https://github.com/CCheukKa/random-small-code\" target=\"_blank\" class=\"bold underline\" style=\"color: #faf8f5;\">my github page</a> for more!"
                }
            />

            <Shelf shelfConfig={projectsConfig} />
        </>
    );
}