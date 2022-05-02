import { useIsMobile } from "@components/mediaQueryHooks";
import JoinDiscordButton from "@components/Social/JoinDiscordButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useModal } from "./Modals/ModalUtils";
import { useMongo, WaitForMongo } from "./Mongo/MongoUtils";

export default function Navbar() {
    const isMobile = useIsMobile();

    const router = useRouter();

    return (
        <div id="navbar">
            <div className="left">
                <Link href="/">
                    <a className="home-btn">{cardsIcon}flippy.cards</a>
                </Link>
                {!isMobile && (
                    <>
                        <Link href="/browse">
                            <a target="_blank">
                                <Button variant="secondary" size="sm">
                                    Browse Packs
                                </Button>
                            </a>
                        </Link>
                    </>
                )}
            </div>
            <div className="right">
                {isMobile ? (
                    <>
                        <MobileDropdown />
                    </>
                ) : (
                    <>
                        <JoinDiscordButton />
                        <WaitForMongo>
                            <Right />
                        </WaitForMongo>
                    </>
                )}
            </div>
        </div>
    );
}

function Right() {
    const { isAnon } = useMongo();
    return !isAnon ? <AuthedSection /> : <UnauthedSection />;
}

function MobileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { isAnon } = useMongo();
    const router = useRouter();
    return (
        <>
            {Hamburger(setIsOpen)}
            {isOpen && (
                <div id="mobile-nav-dropdown">
                    <div className="header">
                        <Link href="/">
                            <a className="home-btn">Flippy.Cards</a>
                        </Link>
                        {close(setIsOpen)}
                    </div>
                    <div className="content">
                        <div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => router.push("/browse")}
                            >
                                Browse Packs
                            </Button>
                        </div>
                        <div>
                            {!isAnon ? <AuthedSection /> : <UnauthedSection />}
                        </div>
                    </div>
                </div>
            )}
        </>
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

const close = (setIsOpen) => (
    <svg
        onClick={() => setIsOpen(false)}
        style={{
            width: "32rem",
            height: "32rem",
        }}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.2929 9.79289C21.6834 9.40237 22.3166 9.40237 22.7071 9.79289C23.0976 10.1834 23.0976 10.8166 22.7071 11.2071L17.4142 16.5L22.7071 21.7929C23.0976 22.1834 23.0976 22.8166 22.7071 23.2071C22.3166 23.5976 21.6834 23.5976 21.2929 23.2071L16 17.9142L10.7071 23.2071C10.3166 23.5976 9.68342 23.5976 9.29289 23.2071C8.90237 22.8166 8.90237 22.1834 9.29289 21.7929L14.5858 16.5L9.29289 11.2071C8.90237 10.8166 8.90237 10.1834 9.29289 9.79289C9.68342 9.40237 10.3166 9.40237 10.7071 9.79289L16 15.0858L21.2929 9.79289Z"
            fill="#674433"
        />
    </svg>
);

const Hamburger = (setIsOpen) => (
    <svg
        onClick={() => setIsOpen(true)}
        style={{
            width: "32rem",
            height: "32rem",
        }}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 10C6 9.44772 6.44772 9 7 9H25C25.5523 9 26 9.44772 26 10C26 10.5523 25.5523 11 25 11H7C6.44772 11 6 10.5523 6 10Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 10C6 9.44772 6.44772 9 7 9H25C25.5523 9 26 9.44772 26 10C26 10.5523 25.5523 11 25 11H7C6.44772 11 6 10.5523 6 10Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 16C6 15.4477 6.44772 15 7 15H25C25.5523 15 26 15.4477 26 16C26 16.5523 25.5523 17 25 17H7C6.44772 17 6 16.5523 6 16Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 16C6 15.4477 6.44772 15 7 15H25C25.5523 15 26 15.4477 26 16C26 16.5523 25.5523 17 25 17H7C6.44772 17 6 16.5523 6 16Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 22C6 21.4477 6.44772 21 7 21H25C25.5523 21 26 21.4477 26 22C26 22.5523 25.5523 23 25 23H7C6.44772 23 6 22.5523 6 22Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 22C6 21.4477 6.44772 21 7 21H25C25.5523 21 26 21.4477 26 22C26 22.5523 25.5523 23 25 23H7C6.44772 23 6 22.5523 6 22Z"
            fill="#674433"
        />
    </svg>
);

const cardsIcon = (
    <svg
        width="33"
        height="32"
        style={{
            width: "33rem",
            height: "32rem",
        }}
        viewBox="0 0 33 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect y="12" width="15" height="20" rx="0.799289" fill="#C2A190" />
        <rect
            x="9"
            y="6.02661"
            width="15"
            height="20"
            rx="0.799289"
            fill="#DECBC0"
        />
        <rect x="18" width="15" height="20" rx="0.799289" fill="#E2B082" />
    </svg>
);
