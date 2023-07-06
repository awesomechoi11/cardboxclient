import { useMongo } from "@components/Mongo/MongoUtils";
import Navbar from "@components/Navbar";
import SearchResultCard from "@components/Search/Search.ResultCard";
import SearchSubjectList from "@components/Search/Search.SubjectList";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function SearchSubjectQueryPage({ params }) {
  const router = useRouter();
  const { query, subject } = router.query;

  const { user, isReady } = useMongo();
  const fetchProjects = ({ page = 0 }) =>
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
    queryKey: ["search", user, query, subject],
    queryFn: () => fetchProjects({ page: 0, query, subject }),
    // keepPreviousData: true,
    enabled: isReady,
  });
  console.log(data);
  return (
    <>
      <Head>
        <title key="title">Flippy - Home - Flashcard App</title>
      </Head>
      <Navbar />
      <main className="p-0 ">
        {/* <SearchSubjectList /> */}
        {isLoading && <>loading</>}
        {isSuccess && (
          <div className="mx-auto desktop:w-[1280px] pt-5">
            <div className=" text-blue-950 text-[16px] font-semibold">
              Results ({data?.totalCount[0].count})
            </div>
            <div className="grid gap-x-3 gap-y-4 grid-cols-3">
              {data?.result?.map((cardData) => (
                <SearchResultCard cardData={cardData} key={cardData._id} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
