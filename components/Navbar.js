import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useModal } from "./Modals/ModalUtils";
import { useMongo } from "./Mongo/MongoUtils";

export default function Navbar() {
    const { user } = useMongo();
    const [authed, setAuthed] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (!user) return;
        if (user.isLoggedIn && user.providerType !== "anon-user") {
            setAuthed(true);
        }
    }, [user]);
    if (user)
        console.log(
            user.isLoggedIn && user.providerType !== "anon-user",
            authed
        );
    return (
        <div id="navbar">
            <div className="left">
                <Link href="/">
                    <a className="home-btn">
                        CardBox
                        <svg
                            width="24rem"
                            height="24rem"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="24"
                                height="24"
                                rx="4"
                                fill="#9E694F"
                            />
                        </svg>
                    </a>
                </Link>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => router.push("/browse")}
                >
                    Browse Packs
                </Button>
            </div>
            <div className="right">
                {authed ? <AuthedSection /> : <UnauthedSection />}
            </div>
        </div>
    );
}

function UnauthedSection() {
    const { openModal } = useModal("login/signup");

    return (
        <>
            <Button
                variant="secondary"
                size="sm"
                onClick={() => openModal("login")}
            >
                Log In
            </Button>
            <Button
                variant="primary"
                size="sm"
                onClick={() => openModal("signup")}
            >
                Sign Up
            </Button>
        </>
    );
}

function AuthedSection() {
    const router = useRouter();

    return (
        <>
            <Button
                variant="primary"
                size="sm"
                onClick={() => router.push("/card-pack-editor")}
            >
                Create Pack
            </Button>
        </>
    );
}
