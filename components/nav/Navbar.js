import Button from "@components/general/Button";
import { useIsMobile } from "@components/mediaQueryHooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ModalWrapper, useModal } from "../Modals/ModalUtils";
import { WaitForMongo, useMongo } from "../Mongo/MongoUtils";
import Searchbar from "./Searchbar";

export default function Navbar() {
    const isMobile = useIsMobile();

    return (
        <div className="flex gap-2 tablet:gap-4 px-1 py-3 items-center tablet:px-4 desktop:px-[225px] bg-blue-200 relative z-10">
            <Link
                href="/"
                onClick={() => {
                    window?.umami?.("Click - Navbar - Home");
                }}
                className="flex items-center"
            >
                {cardsIcon}{" "}
                <span className="hidden ml-2 text-lg font-bold tablet:block">
                    flippy
                </span>
            </Link>
            {!isMobile && (
                <div className="flex items-center">
                    <div>
                        <Link href="/" onClick={subjectSelect} className="flex">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="flex items-center"
                            >
                                Subject
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition ease-in-out hover:rotate-180 duration-600"
                                >
                                    <path
                                        d="M6 9L12 15L18 9"
                                        // stroke="#082858"
                                        className="stroke-blue-600"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Button>
                        </Link>
                    </div>
                    <Link
                        href="/library"
                        onClick={() => {
                            window?.umami?.("Click - Navbar - My Library");
                        }}
                    >
                        <Button variant="secondary" size="sm">
                            My Library
                        </Button>
                    </Link>
                </div>
            )}
            <Searchbar />
            {isMobile ? (
                <>
                    <MobileDropdown />
                </>
            ) : (
                <>
                    <WaitForMongo>
                        <Right />
                    </WaitForMongo>
                </>
            )}
        </div>
    );
}

function Right() {
    const { isAnon } = useMongo();
    console.log(isAnon);
    // return <UnauthedSection />;
    return !isAnon ? <AuthedSection /> : <UnauthedSection />;
}

function subjectSelect() { }

function MobileDropdown() {
    // const [isOpen, setIsOpen] = useState(false);
    const { isAnon } = useMongo();
    const router = useRouter();
    const { openModal } = useModal("mobile navbar");
    return <>{Hamburger(openModal)}</>;
}

export function MobileDropdownModal() {
    const { closeModal } = useModal("mobile navbar");
    const { isAnon } = useMongo();

    return (
        <ModalWrapper
            modalId="mobile navbar"
            innerClassName="px-0 py-4 mx-0 mt-0 pt-3"
        >
            <div className="flex items-center justify-between px-3 pt-0 pb-6">
                <Link href="/" className="flex">
                    {cardsIcon}{" "}
                    <span className="ml-2 text-lg font-bold ">flippy</span>
                </Link>
                {close(closeModal)}
            </div>
            <div className="break-words">
                {/* <div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => router.push("/search")}
                    >
                        Browse Packs
                    </Button>
                </div> */}
                <div>{!isAnon ? <AuthedSection /> : <UnauthedSection />}</div>
            </div>
        </ModalWrapper>
    );
}

function UnauthedSection() {
    const { openModal } = useModal("login/signup");
    const { closeModal } = useModal("mobile navbar");
    return (
        <>
            <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                    closeModal();
                    openModal("login");
                }}
            >
                Log In
            </Button>
            <Button
                variant="primary"
                size="sm"
                onClick={() => {
                    closeModal();
                    openModal("signup");
                }}
            >
                Sign Up
            </Button>
        </>
    );
}

function AuthedSection() {
    const router = useRouter();

    return (
        <div className="">
            <Button
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
            </Button>
        </div>
    );
}

const close = (closeModal) => (
    <svg
        onClick={() => closeModal()}
        style={{
            width: "32",
            height: "32",
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
            className="fill-blue-600"
        />
    </svg>
);

const Hamburger = (openModal) => (
    <svg
        onClick={() => openModal()}
        style={{
            width: "32",
            height: "32",
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
            className="fill-blue-600"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 10C6 9.44772 6.44772 9 7 9H25C25.5523 9 26 9.44772 26 10C26 10.5523 25.5523 11 25 11H7C6.44772 11 6 10.5523 6 10Z"
            className="fill-blue-600"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 16C6 15.4477 6.44772 15 7 15H25C25.5523 15 26 15.4477 26 16C26 16.5523 25.5523 17 25 17H7C6.44772 17 6 16.5523 6 16Z"
            className="fill-blue-600"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 16C6 15.4477 6.44772 15 7 15H25C25.5523 15 26 15.4477 26 16C26 16.5523 25.5523 17 25 17H7C6.44772 17 6 16.5523 6 16Z"
            className="fill-blue-600"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 22C6 21.4477 6.44772 21 7 21H25C25.5523 21 26 21.4477 26 22C26 22.5523 25.5523 23 25 23H7C6.44772 23 6 22.5523 6 22Z"
            className="fill-blue-600"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 22C6 21.4477 6.44772 21 7 21H25C25.5523 21 26 21.4477 26 22C26 22.5523 25.5523 23 25 23H7C6.44772 23 6 22.5523 6 22Z"
            className="fill-blue-600"
        />
    </svg>
);

const cardsIcon = (
    <svg
        width="27"
        height="37"
        viewBox="0 0 27 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <mask id="path-1-inside-1_2134_8395" fill="white">
            <rect y="9" width="20" height="28" rx="3.96369" />
        </mask>
        <rect
            y="9"
            width="20"
            height="28"
            rx="3.96369"
            className="stroke-blue-600"
            strokeWidth="8.66854"
            mask="url(#path-1-inside-1_2134_8395)"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.3343 4.33427V6.99454H7V3.9637C7 1.77461 8.77461 0 10.9637 0H23.0363C25.2254 0 27 1.77461 27 3.96369V24.0363C27 26.2254 25.2254 28 23.0363 28H21.08V23.6657H22.6657V4.33427H11.3343ZM19.16 23.6657H11.3343V9.16028H7V24.0363C7 26.2254 8.77461 28 10.9637 28H19.16V23.6657Z"
            // fill="#124898"
            className="fill-blue-600"
        />
    </svg>
);
