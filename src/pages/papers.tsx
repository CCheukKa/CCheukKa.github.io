import Head from "next/head";
import Shelf from "@/components/Shelf";
import TitleCard from "@/components/TitleCard";
import { Course, Paper, papersConfig } from "@/configs/papersConfig";
import styles from "@/styles/papers.module.css";

export default function PapersPage() {
    return (
        <>
            <Head>
                <title>Papers</title>
            </Head>

            <TitleCard
                title="Papers"
                flavourText="Stuff I have written for university"
                description={
                    "The topics vary quite drastically, and so does the quality. Interesting stuff; some of them are even good."
                    + "\n" +
                    "Not sure why I felt the need host it here, but I guess this is a good showcase of my thoughts on obscure topics."
                    + "\n" +
                    "I really cannot be bothered to fix or change the formatting of the papers, so they are as faithful to whatever I submitted at the time as can be, unless I cannot help it."
                }
            />

            <Shelf>
                {papersConfig.courses.map(course => (
                    course.papers.map(paper =>
                        <ListItem key={paper.pdfName} course={course} paper={paper} />
                    )
                ))}
            </Shelf>
        </>
    );
}

type ListItemProps = {
    course: Course;
    paper: Paper;
};
function ListItem({ course, paper }: ListItemProps) {
    const pdfPath = `${papersConfig.rootPath}/${course.courseCode}/${paper.pdfName}.pdf`;
    const commentedPDFPath =
        paper.commentedPDFName
            ? `${papersConfig.rootPath}/${course.courseCode}/${paper.commentedPDFName}.pdf`
            : null;

    return (
        <div className={styles.list}>
            <span>{paper.type}</span>
            <div className={styles.topic}>
                <a className={styles.pdf} href={pdfPath} target="_blank">{paper.topic}</a>
                {
                    commentedPDFPath
                        ? <a className={styles.commentedPDF} href={commentedPDFPath} target="_blank">💬</a>
                        : null
                }
            </div>
            <span className={styles.course}>{course.courseCode}:<br />{course.courseName}</span>
            <span className={styles.date}>{paper.date}</span>
        </div>
    );
}