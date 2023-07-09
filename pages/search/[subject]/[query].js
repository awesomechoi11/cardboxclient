import { useMongo } from "@components/Mongo/MongoUtils";
import Navbar from "@components/Navbar";
import SearchPagination from "@components/Search/Search.Pagination";
import SearchResultCard from "@components/Search/Search.ResultCard";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function SearchSubjectQueryPage() {
    const router = useRouter();
    const { query, subject } = router.query;
    let limit = 12;

    const [page, setPage] = useState(0);
    const { user, isReady } = useMongo();

    useEffect(() => {
        setPage(0);
    }, [query]);

    const fetchProjects = ({ query, page, subject }) =>
        fetch(`/api/search`, {
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

    const {
        isLoading,
        isSuccess,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
    } = useQuery({
        queryKey: ["search", user, query, page, subject],
        queryFn: () => fetchProjects({ page, query, subject }),
        keepPreviousData: true,
        enabled: isReady,
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <Head>
                <title key="title">Flippy - Home - Flashcard App</title>
            </Head>
            <Navbar />
            <main className="p-0 ">
                {/* <SearchSubjectList /> */}
                {isSuccess && (
                    <div className="mx-auto desktop:max-w-[1280px] tablet:max-w-[848px] max-w-[416px] pt-5">
                        <div className=" text-blue-950 text-[16px] font-semibold">
                            Results ({data?.totalCount[0].count})
                        </div>
                        <div className="grid grid-cols-1 mb-3 gap-x-3 gap-y-4 desktop:grid-cols-3 tablet:grid-cols-2">
                            {data?.result?.map((packData) => (
                                <SearchResultCard
                                    data={packData}
                                    key={packData._id}
                                />
                            ))}
                        </div>
                        <SearchPagination
                            current={page}
                            max={Math.ceil(
                                Number(data?.totalCount[0].count) / limit
                            )}
                            maxDocs={Number(data?.totalCount[0].count)}
                            limit={limit}
                            setPage={setPage}
                        />
                    </div>
                )}
            </main>
        </>
    );
}
