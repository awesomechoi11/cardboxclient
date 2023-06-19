import Head from "next/head";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Button from "@components/general/Button";
import { useState } from "react";
import useSound from "use-sound";
import { useRouter } from "next/router";

export default function Custom404() {
    const [clicked, setClicked] = useState(false);
    const router = useRouter();
    const [play] = useSound(
        `/assets/sounds/meow/meow${Math.floor(Math.random() * 5) + 1}.wav`
    );
    return (
        <>
            <Head>
                <title key="title">404 - Flippy - Flashcard App</title>
            </Head>
            <Navbar />
            <main id="404" className="column">
                <div>
                    {clicked ? (
                        <Image
                            width="360"
                            height="322"
                            className="object-contain"
                            src="/assets/img/404 - 2.png"
                            alt="cute cate -  404"
                        />
                    ) : (
                        <Image
                            width="360"
                            height="322"
                            className="object-contain"
                            src="/assets/img/404 - 1.png"
                            alt="cute cate -  404"
                        />
                    )}
                </div>
                <div className="message">
                    <div className="title-1">404 Not Found</div>
                    <div className="subtitle-2">
                        This page doesn’t exist or was removed!
                    </div>
                </div>
                <Button
                    variant="primary"
                    className="action-btn"
                    onClick={() => {
                        // meow
                        if (!clicked) {
                            play();
                            setClicked(true);
                        } else {
                            router.push("/");
                        }
                    }}
                >
                    {clicked ? "Go Home" : "Meow"}
                </Button>
            </main>
        </>
    );
}
