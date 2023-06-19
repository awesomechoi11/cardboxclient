import Button from "@components/general/Button";
import { useIsMobile } from "@components/mediaQueryHooks";
import clsx from "clsx";
import { Formik } from "formik";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { useModal } from "./Modals/ModalUtils";
import { WaitForMongo, useMongo } from "./Mongo/MongoUtils";

export default function Navbar() {
    const isMobile = useIsMobile();

    return (
        <div className="flex gap-4 px-1  tablet:px-4 desktop:px-[225px]">
            <Link
                href="/"
                onClick={() => {
                    window?.umami?.("Click - Navbar - Home");
                }}
            >
                {cardsIcon}flippy
            </Link>
            {!isMobile && (
                <>
                    <Link
                        href="/search"
                        onClick={() => {
                            window?.umami?.("Click - Navbar - Subjects");
                        }}
                    >
                        <Button variant="secondary" size="sm">
                            Subjects
                        </Button>
                    </Link>
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
                </>
            )}
            <SearchBar />
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

function SearchBar() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const router = useRouter();

    return (
        <Formik
            enableReinitialize
            initialValues={{
                query,
            }}
            validationSchema={Yup.object({
                query: Yup.string()
                    .min(4, "Must be 4 characters or more")
                    .max(254, "Must be 254 characters or less")
                    .required("Required"),
            })}
            onSubmit={(values) => {
                router.push(`/search?query=${values.query}`);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit} className="flex-grow">
                    <div>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pt-[18px] pl-3 pointer-events-none">
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16Z"
                                        stroke="#A5A5A5"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19 19.0004L14.65 14.6504"
                                        stroke="#A5A5A5"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                name="query"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.query}
                                placeholder="Study packs, homework problems, study guides"
                                className={clsx(
                                    errors.email &&
                                        touched.email &&
                                        errors.email &&
                                        "border-red-500",
                                    "w-full py-3 px-4 text-base font-semibold pl-6 bg-blue-200 border-blue-300 rounded-xl placeholder:text-gray-400"
                                )}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                </form>
            )}
        </Formik>
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
                            <a className="home-btn">Flippy</a>
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
            fill="#674433"
        />
    </svg>
);

const Hamburger = (setIsOpen) => (
    <svg
        onClick={() => setIsOpen(true)}
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
            stroke="#124898"
            strokeWidth="8.66854"
            mask="url(#path-1-inside-1_2134_8395)"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.3343 4.33427V6.99454H7V3.9637C7 1.77461 8.77461 0 10.9637 0H23.0363C25.2254 0 27 1.77461 27 3.96369V24.0363C27 26.2254 25.2254 28 23.0363 28H21.08V23.6657H22.6657V4.33427H11.3343ZM19.16 23.6657H11.3343V9.16028H7V24.0363C7 26.2254 8.77461 28 10.9637 28H19.16V23.6657Z"
            fill="#124898"
        />
    </svg>
);
