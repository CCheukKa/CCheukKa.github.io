import styles from "@/styles/404.module.css"
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";

export default function NotFoundPage() {
    return (
        <>
            <div className={styles._404Container}>
                <h1 className={styles._404Title}>404 - Page Not Found</h1>
                <p className={styles._404Message}>The page you are looking for does not exist.</p>
                <br />
                <button
                    onClick={() => window.history.back()}
                    className={styles.backButton}
                >
                    ⬅️ Go back from whence you came
                </button>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "404 (Page Not Found)"
        }
    };
};