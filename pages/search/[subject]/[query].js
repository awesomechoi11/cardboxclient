import Navbar from "@components/Navbar";
import SearchSubjectList from "@components/Search/Search.SubjectList";
import Head from "next/head";
import { useRouter } from "next/router";

export default function SearchSubjectQueryPage({ params }) {
  const router = useRouter();
  const { query, subject } = router.query;
  console.log(query, subject);
  return (
    <>
      <Head>
        <title key="title">Flippy - Home - Flashcard App</title>
      </Head>
      <Navbar />
      <main className="p-0">
        {query} {subject}
        <SearchSubjectList />
      </main>
    </>
  );
}
