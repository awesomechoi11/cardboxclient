import Button from "@components/general/Button";
import { paginate } from "@components/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function SearchPagination({
  current,
  max,
  maxDocs,
  limit,
  setPage,
}) {
  let currentPagination = paginate({ current, max });
  const { current: page, prev, next, items } = currentPagination;
  // console.log(current, max);
  //   console.log(currentPagination);
  return (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between px-3">
      <div>
        <p className="text-sm text-gray-700 ">
          Showing <span className="font-bold">{page * limit + 1}</span> to{" "}
          <span className="font-bold">{(page + 1) * limit}</span> of{" "}
          <span className="font-bold">{maxDocs}</span> results
        </p>
      </div>
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm items-center gap-2"
          aria-label="Pagination"
        >
          <Button
            variant="primary"
            size="roundedSm"
            onClick={() => {
              setPage(prev);
            }}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon
              className="h-5 w-5 -translate-x-[1px]"
              aria-hidden="true"
            />
          </Button>
          {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
          {currentPagination?.items &&
            currentPagination.items.map((pageNum, index) => {
              if (typeof pageNum === "string") {
                return <span key={`${pageNum} ${index}`}>{pageNum}</span>;
              }
              return (
                <Button
                  variant="secondary"
                  size="roundedSm"
                  aria-current="page"
                  key={`${pageNum} ${index}`}
                  onClick={() => {
                    setPage(pageNum);
                  }}
                  disabled={current === pageNum}
                >
                  {pageNum + 1}
                </Button>
              );
            })}
          <Button
            onClick={() => {
              setPage(next);
            }}
            size="roundedSm"
            variant="primary"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon
              className="h-5 w-5 translate-x-[2px]"
              aria-hidden="true"
            />
          </Button>
        </nav>
      </div>
    </div>
  );
}
