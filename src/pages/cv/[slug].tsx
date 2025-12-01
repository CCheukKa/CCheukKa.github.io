import { GetStaticProps, GetStaticPaths } from "next";
import { AppPageProps } from "../_app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { curriculumVitaeConfig } from "@/configs/curriculumVitaeConfig";

export default function CVRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        const slug = router.query.slug as string | string[];
        const path = Array.isArray(slug) ? slug.join('/') : slug;
        const unAbbreviatedPath = curriculumVitaeConfig.shelfItems?.find(item => item.abbreviation.toLowerCase() === path)?.refPath;
        router.replace(`/curriculum-vitae/${unAbbreviatedPath ?? path}`);
    }, [router]);

    return null;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = (curriculumVitaeConfig.shelfItems ?? [])
        .map(item => ({
            params: { slug: item.abbreviation.toLowerCase() }
        }));

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Redirecting to Curriculum Vitae...",
            useTitleAffix: false,
        }
    };
};