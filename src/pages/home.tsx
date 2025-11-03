import Shelf from "@/components/Shelf";
import { homeConfig } from "@/configs/homeConfig";
import { GetStaticProps } from "next";
import { AppPageProps } from "./_app";
import styles from "@/styles/home.module.css";
import TitleCard from "@/components/TitleCard";
import { useRef, useState } from "react";
import { socialBoxConfig, SocialLink } from "@/configs/socialBoxConfig";

export default function HomePage() {
    return (
        <>
            <HomeTitleCard />
            <Shelf shelfConfig={homeConfig} />
        </>
    );
}

export const getStaticProps: GetStaticProps<AppPageProps> = async () => {
    return {
        props: {
            title: "Home",
        }
    };
}

/* -------------------------------------------------------------------------- */

function HomeTitleCard() {
    return (
        <TitleCard style={{ padding: 0 }}>
            <div className={styles.titleCard}>
                <div className={styles.avatarContainer}>
                    <img src="/assets/avatar.svg" alt="Avatar" width="60%" />
                    <span className={styles.description}>Consistent* profile avatar</span>
                </div>
                <div className={styles.centerContainer}>
                    <div className={styles.nameContainer}>
                        <span className={styles.hiText}>Hi! I'm</span>
                        <span className={styles.handleName}>CCheukKa</span>
                        <span className={styles.hiText} style={{ opacity: 0, userSelect: "none" }}>Hi! I'm</span>
                    </div>
                    <span className={styles.fullName}>(Chan Cheuk Ka)</span>
                    <br />
                    <span className={styles.statusText}>I am but a blob of meat who lives on a slab of rock floating on layers of lava on the surface of a piece of wet rock circling a ball of flames drifting among the great darkness and beyond.</span>
                </div>
                <div className={styles.contactsContainer}>
                    <EmailButton />
                    <SocialBox />
                </div>
            </div>
        </TitleCard >
    );
}

function EmailButton() {
    const copyEmailTooltipRef = useRef<HTMLDivElement>(null);
    const sendEmailTooltipRef = useRef<HTMLDivElement>(null);

    const [copied, setCopied] = useState(false);

    return (<div className={styles.emailContainer}>
        <button
            className={styles.copyEmailButton}
            onMouseEnter={() => {
                if (!copyEmailTooltipRef.current) { return; }
                copyEmailTooltipRef.current.style.opacity = "1";
                setCopied(false);
            }}
            onMouseLeave={() => {
                if (!copyEmailTooltipRef.current) { return; }
                copyEmailTooltipRef.current.style.opacity = "0";
            }}
            onClick={() => {
                navigator.clipboard.writeText("contact.CCheukKa@gmail.com");
                setCopied(true);
            }}
        >
            <div className={styles.tooltip} ref={copyEmailTooltipRef}>{copied ? "✅ Copied!" : "📋 Copy to clipboard"}</div>
            <div className={styles.emailLine1}>contact.CCheukKa</div>
            <div className={styles.emailLine2}>
                <span className={styles.emailAt}>@</span>
                <span>gmail.com</span>
            </div>
        </button>
        <a
            className={styles.sendEmailButton}
            target="_blank"
            href="mailto:contact.CCheukKa@gmail.com"
            onMouseEnter={() => {
                if (!sendEmailTooltipRef.current) { return; }
                sendEmailTooltipRef.current.style.opacity = "1";
            }}
            onMouseLeave={() => {
                if (!sendEmailTooltipRef.current) { return; }
                sendEmailTooltipRef.current.style.opacity = "0";
            }}
        >
            <div className={styles.tooltip} ref={sendEmailTooltipRef}>📧 Send email</div>
            <img src="/assets/sendEmail.svg" alt="Email icon" width="40px" />
        </a>
    </div>);
}

function SocialBox() {
    const ICON_SIZE = 32;

    const filteredLinks = socialBoxConfig.links.filter(site => !site.hidden);
    const firstHalf = filteredLinks.slice(0, Math.floor(filteredLinks.length / 2));
    const secondHalf = filteredLinks.slice(Math.floor(filteredLinks.length / 2));
    const balanced = firstHalf.length === secondHalf.length;

    return (
        <div className={styles.socialBox}>
            <div />
            {firstHalf.map((link) => (<SocialLinkIcon key={link.refName} link={link} />))}
            {balanced ? null : <div />}
            <div className={styles.lineBreak} />
            {secondHalf.map((link) => (<SocialLinkIcon key={link.refName} link={link} />))}
            {balanced ? <div /> : null}
        </div>
    );

    /* -------------------------------------------------------------------------- */

    type SocialLinkIconProps = {
        link: SocialLink;
    }
    function SocialLinkIcon({ link }: SocialLinkIconProps) {
        return (
            <a href={link.link} target="_blank" title={link.title}>
                <img src={`/socialBoxIcons/${link.refName}.svg`} height={ICON_SIZE} width={ICON_SIZE} />
            </a>
        );
    }
}