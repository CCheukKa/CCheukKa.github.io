import styles from "@/styles/papers.module.css";
import { Course, Paper, papersConfig } from "@/configs/papersConfig";
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";
import TitleCard from "@/components/TitleCard";
import Body from "@/components/Body";
import ContentCard from "@/components/ContentCard";

export default function PapersPage() {
    return (
        <>
            <TitleCard
                title="Papers"
                flavourText="Academic stuff written for university & more"
                description={
                    "The topics vary quite drastically, and so does the quality. Interesting stuff; some of them are even good."
                    + "\n" +
                    "Not sure why I felt the need host it here, but I guess this is a good showcase of my thoughts on obscure topics."
                    + "\n" +
                    "I really cannot be bothered to fix or change the formatting of the papers, so they are as faithful to whatever I submitted at the time as can be, unless I cannot help it."
                }
            />

            <Body>
                <ContentCard>
                    <PaperList />
                </ContentCard>
            </Body>
        </>
    );
}

function PaperList() {
    return (
        <div className={styles.paperList}>
            {papersConfig.courses.map(course => (
                course.papers.map(paper =>
                    <PaperListItem key={paper.pdfName} course={course} paper={paper} />
                )
            ))}
        </div>
    );
}

type PaperListItemProps = {
    course: Course;
    paper: Paper;
};
function PaperListItem({ course, paper }: PaperListItemProps) {
    const pdfPath = `${papersConfig.rootPath}/${course.courseCode}/${paper.pdfName}.pdf`;
    const commentedPDFPath =
        paper.commentedPDFName
            ? `${papersConfig.rootPath}/${course.courseCode}/${paper.commentedPDFName}.pdf`
            : null;

    return (
        <div className={styles.paperListItem}>
            <span className={styles.type}>{paper.type}</span>
            <div className={styles.topic}>
                <a className={styles.pdf} href={pdfPath} target="_blank">{paper.topic}</a>
                {
                    commentedPDFPath
                        ? <a className={styles.commentedPDF} href={commentedPDFPath} target="_blank">💬</a>
                        : null
                }
            </div>
            <span className={styles.course}>{`${course.courseCode}: `}<br />{course.courseName}</span>
            <span className={styles.date}>{paper.date}</span>
        </div>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Papers"
        }
    };
};