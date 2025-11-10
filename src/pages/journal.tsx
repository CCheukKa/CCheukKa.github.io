import styles from "@/styles/journal.module.css";
import { useState, useEffect, useRef, useMemo } from 'react';
import TitleCard from '@/components/TitleCard';
import { HTTP } from '@/library/http';
import { Encryption } from '@/library/encryption';
import Cookies from 'js-cookie';
import { marked } from 'marked';
import { markedSmartypants } from "marked-smartypants";
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { useLayout } from '@/context/LayoutContext';
import { GetStaticProps } from 'next';
import { AppPageProps } from './_app';
import Body from "@/components/Body";
import ContentCard from "@/components/ContentCard";

const TABLE_OF_CONTENTS_ID = "table-of-contents";
const INTRODUCTION_ID = "introduction";
const LATEST_ID = "latest";

const enum Theme {
    LIGHT = "light",
    DARK = "dark"
}
enum Font {
    TIMES_NEW_ROMAN = "times-new-roman",
    ATKINSON_HYPERLEGIBLE = "atkinson-hyperlegible",
    BELOTA_TEXT = "bellota-text",
    NOTO_SANS = "noto-sans"
}
const fontArray = Object.values(Font);
type Preference = {
    theme: Theme,
    font: Font
}

export default function JournalPage() {
    const enum State {
        INITIAL = "INITIAL",
        PASSWORD_ENTERED = "PASSWORD_ENTERED",
        AUTH_FAILED = "AUTH_FAILED",
        LOADING_CONTENT = "LOADING_CONTENT",
        CONTENT_LOADED = "CONTENT_LOADED"
    }
    const [currentState, setCurrentState] = useState<State>(State.INITIAL);

    type VerificationData = { verificationString: string, fileName: string };
    const [verificationData, setVerificationData] = useState<VerificationData[] | null>(null);
    const [password, setPassword] = useState<string>("");
    const [decryptedMdString, setDecryptedMdString] = useState<string>("");

    const [preferences, setPreferences] = useState<Preference>({
        theme: Theme.DARK,
        font: Font.ATKINSON_HYPERLEGIBLE,
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
        let authCookie: string | undefined;
        try {
            authCookie = Cookies.get(AUTH_COOKIE_NAME);
        } catch (e) {
            console.log(e);
        }
        if (authCookie) {
            console.log(`Using ${authCookie} from cookie as password`);
            setPassword(authCookie);
            setCurrentState(State.PASSWORD_ENTERED);
        } else {
            console.log('no password cookie');
            const userPassword = window.prompt(
                'Password?\n\nIf you know me personally, ask me to generate one for you.\nIf you REALLY know me personally, try your name (no spaces, all lowercase). Terrible security I know.',
                ''
            );
            setPassword(userPassword?.replaceAll(' ', '').toLowerCase() ?? "");
            setCurrentState(State.PASSWORD_ENTERED);
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
        if (currentState === State.PASSWORD_ENTERED && verificationData) {
            verifyPassword(password, verificationData);
        }
    }, [currentState, password, verificationData]);

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
            <TitleCard
                title="Journal"
                flavourText="Thoughts, ideas, and musings"
                description={
                    "The place I write things daily*. You can find more information about this in the journal itself."
                    + "\n" +
                    "I have since decided to put this behind a password wall but you can still access it if you know me."
                }
            />

            <Body outerClassName={styles.body}>
                <ContentCard
                    width="28%"
                    className={styles.tocContainer}
                    ref={tocContainerRef}
                >
                    {useMemo(() => {
                        switch (currentState) {
                            case State.INITIAL:
                                return <div className={styles.statusText}>
                                    Awaiting authentication...
                                </div>;
                            case State.PASSWORD_ENTERED:
                                return <div className={styles.statusText}>
                                    Verifying password...
                                </div>;
                            case State.AUTH_FAILED:
                                return <div className={styles.statusText}>
                                    Invalid password
                                </div>;
                            case State.LOADING_CONTENT:
                                return <div className={styles.statusText}>
                                    Fetching table of contents...
                                </div>;
                            case State.CONTENT_LOADED:
                                return <TableOfContents tocHTML={tocHTML} />;

                            default:
                                console.error(`Unhandled state: ${currentState}`);
                                return <div className={styles.statusText}>Undefined state</div>;
                        }
                    }, [currentState, tocHTML, preferences])}
                </ContentCard>
                <ContentCard
                    width="65%"
                    className={styles.textContainer}
                    data-theme={preferences.theme}
                    data-font={preferences.font}
                >
                    {useMemo(() => {
                        switch (currentState) {
                            case State.INITIAL:
                                return <div className={styles.statusText}>
                                    Awaiting authentication...
                                </div>;
                            case State.PASSWORD_ENTERED:
                                return <div className={styles.statusText}>
                                    Verifying password...
                                </div>;
                            case State.AUTH_FAILED:
                                return <div className={styles.statusText}>
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
                                return <div className={styles.statusText}>
                                    Fetching content...
                                </div>;
                            case State.CONTENT_LOADED:
                                return <JournalContent mdString={decryptedMdString} setTocHTML={setTocHTML} />;

                            default:
                                console.error(`Unhandled state: ${currentState}`);
                                return <div className={styles.statusText}>Undefined state</div>;
                        }
                    }, [currentState, decryptedMdString])}
                </ContentCard>
                <div className={styles.controlsContainer}>
                    <a href={`#${INTRODUCTION_ID}`}>🔝</a>
                    <a href={`#${LATEST_ID}`}>⏬</a>
                    <button
                        onClick={() => setPreferences({
                            ...preferences,
                            theme: preferences.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
                        })}
                    >
                        {preferences.theme === Theme.DARK ? "🌙" : "🔆"}
                    </button>
                    <button
                        className={styles.fontCycleButton}
                        onClick={() => setPreferences({
                            ...preferences,
                            font: fontArray[(fontArray.indexOf(preferences.font) + 1) % fontArray.length] as Font
                        })}
                        data-font={preferences.font}
                    >
                        A
                    </button>
                    <span className={styles.fontIndicator}>
                        {
                            fontArray.map(font => (
                                preferences.font === font ? '●' : '○'
                            )).join('')
                        }
                    </span>
                </div>
            </Body>
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
            setCurrentState(State.AUTH_FAILED);
            return;
        }

        Cookies.set(AUTH_COOKIE_NAME, password, { expires: 7 }); // Save cookie for 7 days
        console.log('Password verified successfully');
        setCurrentState(State.LOADING_CONTENT);


        const verifiedBinUrl = `https://raw.githubusercontent.com/CCheukKa/upload-bin/refs/heads/main/output/${verifiedVerification.fileName}.bin`;
        HTTP.httpGetAsync(verifiedBinUrl, async response => {
            const decryptedMdString = await Encryption.decryptData(response, password);
            // console.log(`Decrypted: ${decryptedMdString}`);
            setDecryptedMdString(decryptedMdString);
            setCurrentState(State.CONTENT_LOADED);
        });
    }
}

type JournalContentProps = {
    mdString: string;
    setTocHTML: (tocHTML: string) => void;
};
function JournalContent({ mdString, setTocHTML }: JournalContentProps) {
    const tags = [
        { icon: '📚', name: 'Academics' },
        { icon: '🏫', name: 'School life' },
        { icon: '💭', name: 'Philosophy' },
        { icon: '🧠', name: 'Mentality' },
        { icon: '🌞', name: 'Well-being' },
        { icon: '👣', name: 'Experiences' },
        { icon: '👥', name: 'Relationships' },
        { icon: '💻', name: 'Personal projects' },
        { icon: '💾', name: 'Technology' },
        { icon: '🍽️', name: 'Food' },
    ];
    tags.forEach(tag => {
        mdString = mdString.replaceAll(`<!-- ${tag.icon} ${tag.name} -->`, `<tag data-icon="${tag.icon}" data-name="${tag.name}"></tag>`);
    });

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

        //TODO: append tags to table of contents
        if (!journalContentRef.current.getAttribute('data-has-tags')) {
            let h4 = journalContentRef.current.getElementsByTagName("h4");
            let tags = journalContentRef.current.getElementsByTagName("tag");
            let tagIndex = 0;
            for (let i = 0; i < h4.length; i++) {
                let tag = tags[tagIndex];
                if (tag && tag.parentElement?.previousSibling?.previousSibling == h4[i]) {
                    let tagContainerElement = document.createElement('span');
                    tagContainerElement.className = 'tagContainer';
                    h4[i].appendChild(tagContainerElement);

                    while (tag && tag.parentElement?.previousSibling?.previousSibling == h4[i]) {
                        let tagElement = document.createElement('span');
                        tagElement.innerHTML = tag.getAttribute('data-icon') ?? "";
                        tagElement.title = tag.getAttribute('data-name') ?? "";
                        tagContainerElement.appendChild(tagElement);

                        tagIndex++;
                        tag = tags[tagIndex];
                    }
                }
            }
            journalContentRef.current.setAttribute('data-has-tags', true.toString());
        }

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

        //^ Scroll to # if present in URL
        const hash = window.location.hash;
        if (hash) {
            const targetElement = journalContentRef.current.querySelector(hash);
            if (targetElement) {
                targetElement.scrollIntoView();
            }
        }

        //^ Add clickable behavior to headings for direct linking
        const headingElements = journalContentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headingElements.forEach(heading => {
            heading.addEventListener('click', () => {
                const id = heading.id;
                if (!id) { return; }
                if (!journalContentRef.current) { return; }
                const url = new URL(window.location.href);
                url.hash = `#${id}`;
                window.history.replaceState({}, '', url.toString());
                heading.scrollIntoView();
            });
        });
    }, [result, journalContentRef.current]);

    return (
        <div ref={journalContentRef} dangerouslySetInnerHTML={{ __html: result }} />
    );
}

type TableOfContentsProps = {
    tocHTML: string;
};
function TableOfContents({ tocHTML }: TableOfContentsProps) {
    const tocListRef = useRef<HTMLDivElement>(null);

    return (<>
        <div className={styles.tocTitle}>
            <span>Table of Contents</span>
            <button
                onClick={() => { tocListRef.current?.scrollTo({ top: 0 }); }}
            >
                🔝
            </button>
            <button
                onClick={() => { tocListRef.current?.scrollTo({ top: tocListRef.current.scrollHeight }); }}
            >
                ⏬
            </button>
        </div>
        <div
            ref={tocListRef}
            className={styles.tocList}
            dangerouslySetInnerHTML={{ __html: tocHTML }}
        />
    </>);
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Journal"
        }
    };
};