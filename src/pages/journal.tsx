import { useState, useEffect, useRef, useMemo } from 'react';
import TitleCard from '@/components/TitleCard';
import { HTTP } from '@/library/http';
import { Encryption } from '@/library/encryption';
import Cookies from 'js-cookie';
import { marked } from 'marked';
import { markedSmartypants } from "marked-smartypants";
import { gfmHeadingId } from 'marked-gfm-heading-id';
import styles from "@/styles/journal.module.css";
import { useLayout } from '@/context/LayoutContext';

const TABLE_OF_CONTENTS_ID = "table-of-contents";
const INTRODUCTION_ID = "introduction";
const LATEST_ID = "latest";

const enum Theme {
    LIGHT = "light",
    DARK = "dark"
}
const FONT_COUNT = 3;
const enum Font {
    TIMES_NEW_ROMAN,
    ATKINSON_HYPERLEGIBLE,
    BELLOTA_TEXT
}
const enum TocMode {
    CALENDAR = "calendar",
    LIST = "list"
}
type Preference = {
    theme: Theme,
    font: Font,
    tocMode: TocMode
}

export default function JournalPage() {
    const enum State {
        INITIAL = "INITIAL",
        AUTH_FAILED = "AUTH_FAILED",
        LOADING_CONTENT = "LOADING_CONTENT",
        CONTENT_LOADED = "CONTENT_LOADED"
    }
    const [currentState, setState] = useState<State>(State.INITIAL);

    type VerificationData = { verificationString: string, fileName: string };
    const [verificationData, setVerificationData] = useState<VerificationData[] | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [decryptedMdString, setDecryptedMdString] = useState<string>("");

    const [preferences, setPreferences] = useState<Preference>({
        theme: Theme.DARK,
        font: Font.TIMES_NEW_ROMAN,
        tocMode: TocMode.LIST
    });
    const PREFERENCE_COOKIE_NAME = 'cck-wtf-journal-preferences';
    useEffect(() => {
        let preferenceCookie: string | undefined;
        try {
            preferenceCookie = Cookies.get(PREFERENCE_COOKIE_NAME);
        } catch (e) {
            console.log(e);
        }
        if (preferenceCookie) {
            const parsedPreferences = JSON.parse(preferenceCookie) as Preference;
            console.log('Using', parsedPreferences, 'from cookie as preference');
            setPreferences(parsedPreferences);
        } else {
            console.log('no preference cookie');
        }
    }, []);
    useEffect(() => {
        Cookies.set(PREFERENCE_COOKIE_NAME, JSON.stringify(preferences), { expires: 365 });
    }, [preferences]);

    const VERIFICATION_PASSWORD = 'verification-password';
    const AUTH_COOKIE_NAME = 'cck-wtf-journal-auth';
    useEffect(() => {
        //! Load password from cookie or prompt user
        let authCookie: string | undefined;
        try {
            authCookie = Cookies.get(AUTH_COOKIE_NAME);
        } catch (e) {
            console.log(e);
        }
        if (authCookie) {
            console.log(`Using ${authCookie} from cookie as password`);
            setPassword(authCookie);
        } else {
            console.log('no password cookie');
            const userPassword = window.prompt(
                'Password?\n\nIf you know me personally, ask me to generate one for you.\nIf you REALLY know me personally, try your name (no spaces, all lowercase). Terrible security I know.',
                ''
            );

            if (userPassword === null) {
                console.log('User cancelled password prompt');
                setState(State.AUTH_FAILED);
            } else {
                setPassword(userPassword?.replaceAll(' ', '').toLowerCase());
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
        } else {
            setState(State.AUTH_FAILED);
        }
    }, [password, verificationData]);

    const [tocHTML, setTocHTML] = useState<string>("");

    const { mainRef } = useLayout();
    const tocContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        updateTocHeight();
        mainRef.current?.addEventListener('scroll', updateTocHeight);
        window.addEventListener('resize', updateTocHeight);
        return;
        /* -------------------------------------------------------------------------- */
        function updateTocHeight() {
            if (tocContainerRef.current) {
                const rect = tocContainerRef.current.getBoundingClientRect();
                const maxHeight = window.innerHeight - rect.top - 20;
                tocContainerRef.current.style.maxHeight = `${maxHeight}px`;
            }
        };
    }, [mainRef.current, tocContainerRef.current]);

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
                    <div className={styles.tocContainer} ref={tocContainerRef}>
                        {useMemo(() => {
                            switch (currentState) {
                                case State.INITIAL:
                                    return <div className={styles.fetchPlaceholder}>
                                        Awaiting authentication...
                                    </div>;
                                case State.AUTH_FAILED:
                                    return <div className={styles.fetchPlaceholder}>
                                        Invalid password
                                    </div>;
                                case State.LOADING_CONTENT:
                                    return <div className={styles.fetchPlaceholder}>
                                        Fetching table of contents...
                                    </div>;
                                case State.CONTENT_LOADED:
                                    return <TableOfContents
                                        tocHTML={tocHTML}
                                        preferences={preferences}
                                        setPreferences={setPreferences}
                                    />;

                                default:
                                    console.error(`Unhandled state: ${currentState}`);
                                    return <div className={styles.fetchPlaceholder}>Undefined state</div>;
                            }
                        }, [currentState, tocHTML, preferences])}
                    </div>
                    <div
                        className={styles.textContainer}
                        data-theme={preferences.theme}
                        data-font={preferences.font}
                    >
                        {useMemo(() => {
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
                                    return <JournalContent mdString={decryptedMdString} setTocHTML={setTocHTML} />;

                                default:
                                    console.error(`Unhandled state: ${currentState}`);
                                    return <div className={styles.fetchPlaceholder}>Undefined state</div>;
                            }
                        }, [currentState, decryptedMdString])}
                    </div>
                    <div className={styles.controlsContainer}>
                        <a href={`#${INTRODUCTION_ID}`}>🔝</a>
                        <a href={`#${LATEST_ID}`}>⏬</a>
                        <button
                            onClick={() => setPreferences({
                                ...preferences,
                                theme: preferences.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
                            })}
                        >
                            {preferences.theme === Theme.DARK ? "🔆" : "🌙"}
                        </button>
                        <button
                            className={styles.fontCycleButton}
                            onClick={() => setPreferences({
                                ...preferences,
                                font: (preferences.font + 1) % FONT_COUNT
                            })}
                            data-font={preferences.font}
                        >
                            A
                        </button>
                        <span className={styles.fontIndicator}>
                            {
                                Array.from({ length: FONT_COUNT }, (_, i) => (
                                    preferences.font === i ? '●' : '○'
                                )).join('')
                            }
                        </span>
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
            Cookies.remove(AUTH_COOKIE_NAME, { path: '' });
            setState(State.AUTH_FAILED);
            return;
        }

        Cookies.set(AUTH_COOKIE_NAME, password, { expires: 7 }); // Save cookie for 7 days
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
    setTocHTML: (tocHTML: string) => void;
};
function JournalContent({ mdString, setTocHTML }: JournalContentProps) {
    const result = marked.use(
        markedSmartypants(),
        gfmHeadingId()
    ).parse(mdString);

    const journalContentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!journalContentRef.current) { return; }
        const tocH1 = journalContentRef.current.querySelector(`#${TABLE_OF_CONTENTS_ID}`);
        const tocList = tocH1?.nextElementSibling;
        setTocHTML(tocList?.outerHTML ?? "");

        //^ Insert "latest" marker before the last <h4>
        const latestElement = document.createElement('div');
        latestElement.id = 'latest';
        const h4Elements = journalContentRef.current.getElementsByTagName('h4');
        if (h4Elements.length > 0) {
            const lastH4 = h4Elements[h4Elements.length - 1];
            lastH4.parentNode?.insertBefore(latestElement, lastH4);
        } else {
            console.warn('No <h4> elements found to insert before.');
        }
    }, [result, journalContentRef.current]);

    return (
        <div ref={journalContentRef} dangerouslySetInnerHTML={{ __html: result }} />
    );
}

type TableOfContentsProps = {
    tocHTML: string;
    preferences: Preference;
    setPreferences: (prefs: Preference) => void;
};
function TableOfContents({ tocHTML, preferences, setPreferences }: TableOfContentsProps) {
    return (<>
        <div className={styles.tocTitle}>
            <span>Table of Contents</span>
            <button
                className={styles.tocModeButton}
                onClick={() => setPreferences({
                    ...preferences,
                    tocMode: preferences.tocMode === TocMode.LIST ? TocMode.CALENDAR : TocMode.LIST
                })}
            >
                {
                    preferences.tocMode === TocMode.LIST ? "📆" : "🧾"
                }
            </button>
        </div>
        <div className={styles.tocList} dangerouslySetInnerHTML={{ __html: tocHTML }} />
    </>);
}