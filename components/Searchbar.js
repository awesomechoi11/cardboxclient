import clsx from "clsx";
import { Formik, useField } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { useQuery } from "react-query";
import BoldSubstring from "./general/BoldSubstring";

export default function Searchbar() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const router = useRouter();

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

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
        router.push(`/search/${values.query}`);
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
        <form
          onSubmit={handleSubmit}
          className="flex-grow relative"
          autocomplete="off"
        >
          <div tabindex="-1" onFocus={onFocus} onBlur={onBlur}>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute left-0 flex items-center pt-[18px] pl-3 pointer-events-none">
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
            <SearchAutocomplete focused={focused} />
          </div>
        </form>
      )}
    </Formik>
  );
}

function SearchAutocomplete({ focused }) {
  const [field, meta, helpers] = useField("query");
  const { value } = field;
  const router = useRouter();
  const { isIdle, isError, isLoading, isSuccess, data } = useQuery(
    ["navbar searchbar", value],
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
  console.log(data);

  return (
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
            {isLoading && (
              <div className="font-bold text-center py-3">Loading</div>
            )}
            {!!data?.length && (
              <>
                {data?.map((result) => (
                  <button
                    type="button"
                    onClick={(e) => {
                      //   helpers.setValue(result.title);
                      router.push(`/search/${result.title}`);
                    }}
                    key={result._id}
                    className="px-1 py-3 rounded-xl hover:bg-blue-200 text-left transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={4}
                      stroke="currentColor"
                      className="w-3 h-3 inline mr-3"
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
            {isSuccess && !data?.length && (
              <div className="font-bold text-center py-3">
                Sorry, No Results Found
              </div>
            )}
            {isError && (
              <div className="font-bold text-center py-3">
                Something Went Wrong...
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
