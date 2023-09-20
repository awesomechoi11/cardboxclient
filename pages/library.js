import Head from "next/head";
import Button from "@components/general/Button";
import { useMongo } from "@components/Mongo/MongoUtils";
import Navbar from "@components/nav/Navbar";
import LibraryUserCard from "@components/Library/Library.UserCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function LibraryUserCardPage() {
    const router = useRouter();
    const { query, subject } = router.query;
    const { user, isReady } = useMongo();

    const pages = {
        label: "My Published Packs",
        collection: "cardpacks",
        query: (db) =>
            db.collection("cardpacks").find({
                author: user.id,
            }), 
    }

    const fetchProjects = ({ query, page, subject }) =>
        fetch(`/api/library`, { 
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                page,
                subject,
            }),
        }).then(async (res) => (await res.json()).results[0]);

    return (
        <>
            <Head>
                <title key="title">Flippy - Home - Flashcard App</title>
            </Head>
            <Navbar />
            <div className="flex justify-between w-[1000px] mx-auto mt-10">
                <div>
                    <p className="text-lg font-semibold">hamchu</p>
                    <p className="text-[#082858] opacity-75">Gerald Fitzburger</p>
                </div>
                <Button
                    className="flex items-center"
                    variant="create"
                    size="xs"
                    onClick={() => router.push("/editor")}
                >
                    <svg
                        width="31"
                        height="30"
                        viewBox="0 0 31 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.2083 5.6434C14.2083 4.95304 14.7866 4.3934 15.4999 4.3934C16.2133 4.3934 16.7916 4.95304 16.7916 5.6434L16.7916 13.75L25.1684 13.75C25.8818 13.75 26.4601 14.3096 26.4601 15C26.4601 15.6904 25.8818 16.25 25.1684 16.25L16.7916 16.25L16.7916 24.3566C16.7916 25.047 16.2133 25.6066 15.4999 25.6066C14.7866 25.6066 14.2083 25.047 14.2083 24.3566L14.2083 16.25L5.83145 16.25C5.11809 16.25 4.53979 15.6904 4.53979 15C4.53979 14.3096 5.11809 13.75 5.83145 13.75L14.2083 13.75L14.2083 5.6434Z"
                            fill="white"
                        />
                    </svg>
                    Create New Cardpack
                </Button>
            </div>
            <section>
                
            </section>
        </>
    )
}