import { GetStaticProps, GetStaticPaths } from 'next';
import { plasticityConfig } from '@/configs/plasticityConfig';
import styles from '@/styles/plasticity.module.css';
import fs from 'fs';
import path from 'path';
import TitleCard from '@/components/TitleCard';
import Shelf from '@/components/Shelf';
import { AppPageProps } from '../_app';

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
            <Shelf>
                <div className={styles.textContainer}>
                    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }} />
                </div>
            </Shelf>
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