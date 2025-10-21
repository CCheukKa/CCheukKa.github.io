import Header from "@/components/header"
import styles from "@/styles/404.module.css"

export default function NotFoundPage() {
    return (
        <>
            <title>404 - Page Not Found</title>

            <Header />

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