import Head from "next/head";
import Button from "@components/general/Button";
import { useMongo } from "@components/Mongo/MongoUtils";
import Navbar from "@components/nav/Navbar";
import CardPackBrowser from "@components/Browse/CardPackBrowser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import Text from "@components/general/Text";
import { useModal } from "@components/Modals/ModalUtils";

export default function LibraryUserCardPage() {
    const router = useRouter();
    const { query, subject } = router.query;
    const { user, db, isAnon } = useMongo();
    const { openModal } = useModal("library result preview");

    const { isLoading, isError, isIdle, isSuccess, data, refetch } = useQuery(
        ["library", user, isAnon],
        () =>
            db.collection("cardpackDrafts").find({
                author: user.id
            }),
        { refetchOnWindowFocus: false, enabled: !!db && !isAnon }
    );

    return (
        <>
            <Head>
                <title key="title">Flippy - Home - Flashcard App</title>
            </Head>
            <Navbar />
            <div className="flex justify-between w-full max-w-[1200px] mx-auto mt-10 flex-col sm:flex-row gap-4 px-2">
                <div>
                    <p className="text-xl font-semibold mx-2">
                        Library
                    </p>
                </div>
                <Button
                    className="flex items-center gap-2 pr-2 justify-center"
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
            {/* <CardPackBrowser /> */}
            <main className="p-0 pb-4">
                {/* <SearchSubjectList /> */}
                {isSuccess && (
                    <div className="box-content mx-auto tablet:mx-auto desktop:max-w-[1280px] tablet:max-w-[848px] max-w-[416px] pt-5">
                        <div className="grid grid-cols-1 mx-1 mb-3 gap-x-3 gap-y-4 desktop:grid-cols-3 tablet:grid-cols-2">
                            {data.map((data) => (
                                <>
                                    <div
                                        className="w-full tablet:max-w-[416px] px-3 py-2 h-[212px] relative bg-white rounded-lg shadow-lg cursor-pointer"
                                        onClick={() => {
                                            openModal({data , refetch});
                                        }}
                                    >
                                        <div className="flex flex-col justify-between h-full">
                                            <div>
                                                <div className="inline-flex flex-col items-start justify-start gap-3">
                                                    <div className="">{data.title || "untitled"}</div>
                                                    <div className="pb-[3px] justify-center items-start gap-4 inline-flex">
                                                        <div>
                                                            <span className="text-blue-950 text-[14px] font-semibold">
                                                                {data.cards.length}
                                                            </span>
                                                            <span className="text-neutral-400 text-[14px] font-semibold">
                                                                {" "}
                                                                Cards
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="inline-flex items-center justify-center gap-1 ">
                                                    </div>
                                                </div>
                                                <div className="right-[16px] top-[100px] absolute justify-end items-center gap-2.5 inline-flex">
                                                    <svg
                                                        width="8"
                                                        height="14"
                                                        viewBox="0 0 8 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M1 13L7 7L1 1"
                                                            stroke="#A5A5A5"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            {/* <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className=" bg-stone-50 rounded-xl justify-center items-center gap-[5.06px] inline-flex">
                                                        <img
                                                            className="w-[20.22px] h-[20.22px] rounded-[37.92px]"
                                                            src="https://via.placeholder.com/20x20"
                                                        />
                                                        <div className="justify-start items-center gap-[2.53px] flex">
                                                            <div className="text-blue-950 text-[12px] font-semibold">
                                                                hamchu
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=" bg-stone-50 rounded-xl justify-center items-center gap-[5.06px] inline-flex">
                                                        <div className="justify-start items-center gap-[2.53px] flex">
                                                            <div className="text-blue-950 text-[12px] font-semibold">
                                                                Grade 7
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="inline-flex items-center justify-end gap-1">
                                                    <div className="h-5 px-[1.67px] py-[4.17px] justify-center items-center flex" />
                                                    <div className="text-neutral-400 text-[14px] font-semibold">
                                                        526 Views
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </>
                            )
                            )
                            }
                        </div>
                    </div>
                )}
            </main>
            <section>
            </section>
        </>
    )
}