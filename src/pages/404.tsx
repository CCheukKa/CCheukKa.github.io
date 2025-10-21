import Header from "@/components/header"
import styles from "@/styles/404.module.css"

export default function NotFoundPage() {
    return (
        <>
            <title>404 - Page Not Found</title>

            <Header />

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100svw",
                height: "90svh",
            }}>
                <h1 style={{
                    fontFamily: "'Bellota Text', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                }}>
                    404 - Page Not Found
                </h1>
                <p style={{
                    fontFamily: "'Montserrat Alternates', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                }}>
                    The page you are looking for does not exist.
                </p>
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