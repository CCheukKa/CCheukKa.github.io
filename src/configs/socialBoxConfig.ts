export type SocialLink = {
    refName: string;
    link: string;
    title: string;
    hidden?: boolean;
}

type SocialBoxConfig = {
    links: SocialLink[]
}

export const socialBoxConfig: SocialBoxConfig = {
    links: [{
        refName: "youtube",
        link: "https://www.youtube.com/c/CCheukKa",
        title: "My YouTube channel"
    },
    {
        refName: "x",
        link: "https://x.com/CCheukKa_",
        title: "My X profile"
    },
    {
        refName: "github",
        link: "https://github.com/CCheukKa",
        title: "My Github profile"
    },
    {
        refName: "patreon",
        link: "https://www.patreon.com/CCheukKa",
        title: "My Patreon page",
        hidden: true
    },
    {
        refName: "reddit",
        link: "https://www.reddit.com/u/CCheukKa",
        title: "My Reddit profile"
    },
    {
        refName: "discord",
        link: "https://discord.gg/RdvQgMq3qk",
        title: "My Discord server"
    },
    {
        refName: "steam",
        link: "https://steamcommunity.com/id/CCheukKa/",
        title: "My Steam profile"
    },
    {
        refName: "facebook",
        link: "https://www.facebook.com/CCheukKa/",
        title: "My Facebook profile"
    },
    {
        refName: "instagram",
        link: "https://www.instagram.com/ccheukka_/",
        title: "My Instagram profile"
    },
    {
        refName: "linkedin",
        link: "https://www.linkedin.com/in/ccheukka/",
        title: "My LinkedIn profile"
    },
    {
        refName: "lichess",
        link: "https://lichess.org/@/CCheukKa",
        title: "My lichess profile"
    }
    ]
}