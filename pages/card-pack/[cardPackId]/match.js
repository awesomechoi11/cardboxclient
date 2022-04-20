import Head from "next/head";
import Navbar from "../../../components/Navbar";

export default function CardPackMatchGameMode() {
    return (
        <>
            <Head>
                <title>Card Pack - Flippy - Flashcard App</title>
                <meta name="description" content="Flippy - Flashcard App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main id="card-pack">match!!!</main>
        </>
    );
}
