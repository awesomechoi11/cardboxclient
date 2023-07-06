import clsx from "clsx";
import { Formik, useField } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { useQuery } from "react-query";
import BoldSubstring from "./general/BoldSubstring";
import { useDebouncedValue } from "rooks";
import DotLoader from "react-spinners/DotLoader";

export default function Searchbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    return (
        <Formik
            enableReinitialize
            initialValues={{
                query,
            }}
            validationSchema={Yup.object({
                query: Yup.string()
                    .min(3, "Must be 3 characters or more")
                    .max(254, "Must be 254 characters or less")
                    .required("Required"),
            })}
            onSubmit={(values) => {
                router.push(`/search/any/${values.query}`);
            }}
        >
            {(props) => <SearchInner {...props} />}
        </Formik>
    );
}

function SearchInner({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    /* and other goodies */
}) {
    const router = useRouter();

    const [focused, setFocused] = useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
    const [field, meta, helpers] = useField("query");
    const { value } = field;
    const debouncedValue = useDebouncedValue(value, 200);
    const { isIdle, isError, isLoading, isSuccess, data, isFetching } =
        useQuery(
            ["navbar searchbar", debouncedValue],
            async () => {
                let response = await fetch("/api/autocomplete", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: value,
                    }),
                });
                return (await response.json()).results;
            },
            {
                refetchOnWindowFocus: false,
                enabled: Boolean(focused && value),
                keepPreviousData: true,
            }
        );

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex-grow"
            autoComplete="off"
        >
            <div tabIndex="-1" onFocus={onFocus} onBlur={onBlur}>
                <div className="relative rounded-md">
                    <div className="absolute left-0 flex items-center pt-[18px] pl-3 pointer-events-none">
                        <AnimatePresence>
                            {isFetching ? (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{
                                        opacity: 0,
                                    }}
                                >
                                    <DotLoader color="#1A63D0" size={24} />
                                </motion.span>
                            ) : (
                                <motion.svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{
                                        opacity: 0,
                                    }}
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
                                </motion.svg>
                            )}
                        </AnimatePresence>
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
                <AnimatePresence>
                    {focused && value && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{
                                ease: [0.07, 0.68, 0.29, 0.98],
                            }}
                            className="absolute left-0 right-0"
                        >
                            <div className="relative top-1 border-[1px] bg-white border-gray-200 rounded-xl text-base p-1 flex flex-col gap-1 shadow-xl">
                                {isFetching && !data && (
                                    <div className="py-3 font-bold text-center">
                                        Loading
                                    </div>
                                )}
                                {!!data?.length && (
                                    <>
                                        {data?.map((result) => (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    helpers.setValue(
                                                        result.title
                                                    );
                                                    router.push(
                                                        `/search/any/${result.title}`
                                                    );
                                                }}
                                                key={result._id}
                                                className="px-1 py-3 text-left transition-colors rounded-xl hover:bg-blue-200"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={4}
                                                    stroke="currentColor"
                                                    className="inline w-3 h-3 mr-3"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                                    />
                                                </svg>
                                                <BoldSubstring
                                                    mainString={result.title}
                                                    subString={value}
                                                />
                                            </button>
                                        ))}
                                        <button className="px-1 py-3 rounded-xl hover:bg-blue-300 transition-colors outline outline-[1px] font-bold outline-blue-300 bg-blue-200">
                                            View All
                                        </button>
                                    </>
                                )}
                                {isSuccess && !isFetching && !data?.length && (
                                    <div className="py-3 font-bold text-center">
                                        Sorry, No Results Found
                                    </div>
                                )}
                                {!isFetching && isError && (
                                    <div className="py-3 font-bold text-center">
                                        Something Went Wrong...
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>{" "}
            </div>
        </form>
    );
}
