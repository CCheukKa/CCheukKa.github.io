import { GetStaticProps, GetStaticPaths } from 'next';
import { plasticityConfig } from '@/configs/plasticityConfig';
import styles from '@/styles/plasticity.module.css';
import fs from 'fs';
import path from 'path';
import TitleCard from '@/components/TitleCard';
import { AppPageProps } from '../_app';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

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

type PlasticityContentPageProps = AppPageProps & {
    metadata: {
        title: string;
        flavourText: string;
        description: string;
        date: string;
    };
    content: string;
};

export default function PlasticityContentPage({ metadata, content }: PlasticityContentPageProps) {

    const [preferences, setPreferences] = useState<Preference>({
        theme: Theme.DARK,
        font: Font.ATKINSON_HYPERLEGIBLE,
    });
    const PREFERENCE_COOKIE_NAME = 'cck-wtf-plasticity-preferences';
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

    return (
        <>
            <TitleCard
                title={metadata.title}
                flavourText={metadata.flavourText}
                description={metadata.description}
            />

            <div className={styles.date}>
                <span>Written on: </span>
                <span className={styles.dateText}>{metadata.date}</span>
            </div>
            <div className={styles.bodyWrapper}>
                <div
                    className={styles.textContainer}
                    data-theme={preferences.theme}
                    data-font={preferences.font}
                >
                    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
                </div>
                <div className={styles.controlsContainer}>
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
            </div>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = plasticityConfig.shelfItems
        .filter(item => !item.isRemote)
        .map(item => ({
            params: { slug: item.refPath }
        }));

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<PlasticityContentPageProps> = async ({ params }) => {
    const slug = params?.slug as string;

    try {
        const metadataPath = path.join(process.cwd(), 'src', 'pages', 'plasticity', `${slug}.json`);
        const metadataContent = fs.readFileSync(metadataPath, 'utf8');
        const metadata = JSON.parse(metadataContent);

        const contentPath = path.join(process.cwd(), 'src', 'pages', 'plasticity', `${slug}.txt`);
        const content = fs.readFileSync(contentPath, 'utf8');

        return {
            props: {
                title: `Plasticity • ${metadata.title}`,
                metadata,
                content
            }
        };
    } catch (error) {
        console.error(`Error loading plasticity content for slug "${slug}":`, error);
        return {
            notFound: true
        };
    }
};