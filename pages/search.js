import Navbar from "@components/Navbar";
import SubjectCard from "@components/Search/SubjectCard";
import Head from "next/head";

const subjectCards = [
    {
        backgroundImg: {
            src: "https://cdn.discordapp.com/attachments/1082157939906855083/1120225889892966470/image.png",
            alt: "Hot air balloon flying over a river and mountains",
        },
        title: "Geography",
        titleColor: "#FAFDFD",
        topGradient:
            "linear-gradient(180deg, #E6596B 0%, rgba(230, 89, 107, 0) 100%)",

        subtitle: "62 topics",
        subtitleColor: "#FAFDFD",
        bottomGradient:
            "linear-gradient(180deg, rgba(14, 46, 66, 0) 0%, #0E2E42 100%)",

        to: "/subject/geography",
    },
    {
        backgroundImg: {
            src: "https://cdn.discordapp.com/attachments/1082157939906855083/1120234810531643482/image.png",
            alt: "Morning sunrise on a river between desert mountains",
        },
        title: "History",
        titleColor: "#FAFDFD",
        topGradient:
            "linear-gradient(180deg, #4592BC 0%, rgba(69, 146, 188, 0) 100%)",

        subtitle: `US History, Ancient History, Japanese History`,
        subtitleColor: "#FAFDFD",
        bottomGradient:
            "linear-gradient(180deg, rgba(14, 46, 66, 0) 0%, #0E2E42 100%)",

        to: "/subject/history",
    },
    {
        backgroundImg: {
            src: "https://cdn.discordapp.com/attachments/1082157939906855083/1120234811030782003/image.png",
            alt: "Egyptian Sphynx in a middle of a oasis",
        },
        title: "Architecture",
        titleColor: "#031024",
        topGradient:
            "linear-gradient(180deg, #FACE6C 0%, rgba(250, 206, 108, 0) 100%)",

        subtitle: `Architectural History, Codes and Regulations, Models`,
        subtitleColor: "#FAFDFD",
        bottomGradient:
            "linear-gradient(180deg, rgba(14, 46, 66, 0) 0%, #0E2E42 100%)",

        to: "/subject/architecture",
    },
    {
        backgroundImg: {
            src: "https://cdn.discordapp.com/attachments/1082157939906855083/1120234811525705818/image.png",
            alt: "Starry night sky, curious man with ladder gazing upwards",
        },
        title: "Physics",
        titleColor: "#FAFDFD",
        topGradient:
            "linear-gradient(0deg, rgba(19, 30, 58, 0) 0%, #141E3B 100%)",

        subtitle: `Astrophysics, Nuclear physics, AP Physics`,
        subtitleColor: "#FAFDFD",
        bottomGradient:
            "linear-gradient(180deg, rgba(14, 46, 66, 0) 0%, #0E2E42 100%)",

        to: "/subject/physics",
    },
];

export default function Search() {
    return (
        <>
            <Head>
                <title key="title">Flippy - Home - Flashcard App</title>
            </Head>
            <Navbar />
            <main className="p-0">
                dsaads
                <div className="flex gap-4">
                    {subjectCards.map((data, index) => (
                        <SubjectCard {...data} key={index} />
                    ))}
                </div>
            </main>
        </>
    );
}
