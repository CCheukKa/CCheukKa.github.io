import { useState, useEffect, useMemo } from 'react';
import TitleCard from '@/components/TitleCard';
import { HTTP } from '@/library/http';
import { Encryption } from '@/library/encryption';
import Cookies from 'js-cookie';
import { marked } from 'marked';
import { markedSmartypants } from "marked-smartypants";
import { gfmHeadingId, getHeadingList } from 'marked-gfm-heading-id';
import styles from "@/styles/journal.module.css";

const TABLE_OF_CONTENTS_ID = "table-of-contents";
const INTRODUCTION_ID = "introduction";
const LATEST_ID = "latest";

export default function JournalPage() {
    const enum State {
        INITIAL = "INITIAL",
        AUTH_FAILED = "AUTH_FAILED",
        LOADING_CONTENT = "LOADING_CONTENT",
        CONTENT_LOADED = "CONTENT_LOADED"
    }

    type VerificationData = { verificationString: string, fileName: string };
    const [verificationData, setVerificationData] = useState<VerificationData[] | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [decryptedMdString, setDecryptedMdString] = useState<string>("");
    const [currentState, setState] = useState<State>(State.INITIAL);

    const VERIFICATION_PASSWORD = 'verification-password';
    const COOKIE_NAME = 'cck-wtf-journal';

    useEffect(() => {
        //! Load password from cookie or prompt user
        let cookie: string | undefined;
        try {
            cookie = Cookies.get(COOKIE_NAME);
        } catch (e) {
            console.log(e);
        }
        if (cookie) {
            console.log(`Using ${cookie} from cookie as password`);
            setPassword(cookie);
        } else {
            console.log('no cookie');
            const userPassword = window.prompt(
                'Password?\n\nIf you know me personally, ask me to generate one for you.\nIf you REALLY know me personally, try your name (no spaces, all lowercase). Terrible security I know.',
                ''
            );
            if (userPassword !== null) {
                const cleanedPassword = userPassword.replaceAll(' ', '').toLowerCase();
                setPassword(cleanedPassword);
            }
        }

        HTTP.httpGetAsync(
            "https://raw.githubusercontent.com/CCheukKa/upload-bin/refs/heads/main/output/verification-data.bin",
            async (response: string) => {
                // console.log(response);
                const decryptedData = await Encryption.decryptData(response, VERIFICATION_PASSWORD);
                const parsedData = JSON.parse(decryptedData);
                // console.log(parsedData);
                setVerificationData(parsedData);
            }
        );
    }, []);

    useEffect(() => {
        if (password && verificationData) {
            verifyPassword(password, verificationData);
        }
    }, [password, verificationData]);

    return (
        <>
            <title>Journal</title>

            <TitleCard
                title="Journal"
                flavourText="Thoughts, ideas, and musings"
                description={
                    "The place I write things daily*. You can find more information about this in the journal itself."
                    + "\n" +
                    "I have since decided to put this behind a password wall but you can still access it if you know me."
                }
            />

            {
                <div className={styles.bodyContainer}>
                    <div className={styles.tocContainer}>
                        <div className={styles.fetchPlaceholder}>Fetching table of contents...</div>
                    </div>
                    <div className={styles.textContainer}>
                        {
                            useMemo(() => (() => {
                                switch (currentState) {
                                    case State.INITIAL:
                                        return <div className={styles.fetchPlaceholder}>
                                            Awaiting authentication...
                                        </div>;
                                    case State.AUTH_FAILED:
                                        return <div className={styles.fetchPlaceholder}>
                                            Invalid password
                                            <br />
                                            <br />
                                            If you know me personally, ask me to generate one for you.
                                            <br />
                                            If you REALLY know me personally, try your name.
                                            <br />
                                            <br />
                                            Refresh to try again.
                                        </div>;
                                    case State.LOADING_CONTENT:
                                        return <div className={styles.fetchPlaceholder}>
                                            Fetching content...
                                        </div>;
                                    case State.CONTENT_LOADED:
                                        return <JournalContent mdString={decryptedMdString} />;

                                    default:
                                        console.error(`Unhandled state: ${currentState}`);
                                        return <div className={styles.fetchPlaceholder}>Undefined state</div>;
                                }
                            })(), [currentState, decryptedMdString])
                        }
                    </div>
                    <div className={styles.controlsContainer}>
                        <a href={`#${INTRODUCTION_ID}`}>🔝</a>
                        <a href={`#${LATEST_ID}`}>⏬</a>
                        <a style={{ cursor: "pointer" }} /*onClick={() => toggleDarkMode()}*/>🔅</a>
                        <a className={styles.fontCycleButton} style={{ cursor: "pointer", height: "53px" }} /*onClick={() => cycleFonts()}*/>A</a>
                        <span style={{ fontSize: "10pt", position: "relative", bottom: "10px" }}>●○○</span>
                    </div>
                </div>
            }
        </>
    );

    /* -------------------------------------------------------------------------- */

    async function verifyPassword(password: string, verificationData: VerificationData[]) {
        console.log(`Verifying password ${password}...`);
        let verifiedVerification: VerificationData | null = null;

        for (const verification of verificationData) {
            const decryptedVerificationString = await Encryption.decryptData(verification.verificationString, password ?? "")
                .catch(() => console.log(`Decryption failed for ${verification.verificationString} with password ${password}`));
            if (!decryptedVerificationString) { continue; }
            verifiedVerification = verification;
            break;
        }


        if (!verifiedVerification) {
            console.warn('No verification found');
            Cookies.remove(COOKIE_NAME, { path: '' });
            setState(State.AUTH_FAILED);
            return;
        }

        Cookies.set(COOKIE_NAME, password, { expires: 7 }); // Save cookie for 7 days
        console.log('Password verified successfully');
        setState(State.LOADING_CONTENT);


        const verifiedBinUrl = `https://raw.githubusercontent.com/CCheukKa/upload-bin/refs/heads/main/output/${verifiedVerification.fileName}.bin`;
        HTTP.httpGetAsync(verifiedBinUrl, async response => {
            const decryptedMdString = await Encryption.decryptData(response, password);
            // console.log(`Decrypted: ${decryptedMdString}`);
            setDecryptedMdString(decryptedMdString);
            setState(State.CONTENT_LOADED);
        });
    }
}

type JournalContentProps = {
    mdString: string;
};
function JournalContent({ mdString }: JournalContentProps) {
    const result = marked.use(
        markedSmartypants(),
        gfmHeadingId()
    ).parse(mdString);

    const headingList = getHeadingList();

    if (!headingList.find(heading => heading.id === TABLE_OF_CONTENTS_ID)) {
        console.warn(`Table of contents ID "${TABLE_OF_CONTENTS_ID}" not found in headings.`);
    }
    if (!headingList.find(heading => heading.id === INTRODUCTION_ID)) {
        console.warn(`Introduction ID "${INTRODUCTION_ID}" not found in headings.`);
    }
    if (!headingList.find(heading => heading.id === LATEST_ID)) {
        console.warn(`Latest ID "${LATEST_ID}" not found in headings.`);
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: result }} />
    );
}