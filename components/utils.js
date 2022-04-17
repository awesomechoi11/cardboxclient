import imageCompression from "browser-image-compression";
import ReactDOMServer from "react-dom/server";
import { customAlphabet } from "nanoid";
import { useMemo, useState } from "react";
import paginationator from "paginationator";
import copy from "fast-copy";

export function relativeRem(pxVal, designersWidth = 1920) {
    if (typeof window !== "undefined") {
        // Client-side-only code
        const userWidth = window?.innerWidth;
        return (pxVal / designersWidth) * userWidth;
    }
}

export function createGroups(arr, perGroup) {
    const numGroups = Math.ceil(arr.length / perGroup);
    return new Array(numGroups)
        .fill("")
        .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
}

export async function compressImageFile(file) {
    const imageFile = file;

    const options = {
        maxSizeMB: 0.7, // (default: Number.POSITIVE_INFINITY)
        maxWidthOrHeight: 800, // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
        // but, automatically reduce the size to smaller than the maximum Canvas size supported by each browser.
        // Please check the Caveat part for details.
        //   onProgress: Function,       // optional, a function takes one progress argument (percentage from 0 to 100)
        useWebWorker: true, // optional, use multi-thread web worker, fallback to run in main-thread (default: true)

        // following options are for advanced users
        //   maxIteration: number,       // optional, max number of iteration to compress the image (default: 10)
        //   exifOrientation: number,    // optional, see https://stackoverflow.com/a/32490603/10395024
        //   fileType: string,           // optional, fileType override
        //   initialQuality: number      // optional, initial quality value between 0 and 1
    };
    try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log(
            "compressedFile instanceof Blob",
            compressedFile instanceof Blob
        ); // true
        console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB
        return compressedFile;
        // await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
        console.log(error);
    }
}

export function encodeSvg(reactElement) {
    return (
        "data:image/svg+xml," +
        escape(ReactDOMServer.renderToStaticMarkup(reactElement))
    );
}

export function deepSwapKeys(obj, key1, key2) {
    [obj[key1], obj[key2]] = [
        JSON.parse(JSON.stringify(obj[key2])),
        JSON.parse(JSON.stringify(obj[key1])),
    ];
}

export const alphaNumId = customAlphabet("1234567890abcdef", 16);

export const usePaginationator = (arr) => {
    const [currentPage, setCurrentPage] = useState(0);

    const { pages } = useMemo(
        () =>
            paginationator(arr, {
                limit: 12,
            }),
        [arr]
    );

    //=> { pages: [
    //=>   { idx: 0, total: 3, current: 1, items: [1, 2], first: 1, last: 3, next: 2 },
    //=>   { idx: 1, total: 3, current: 2, items: [3, 4], first: 1, last: 3, prev: 1, next: 3 },
    //=>   { idx: 2, total: 3, current: 3, items: [5], first: 1, last: 3, prev: 2 }
    //=> ]}

    return {
        pages,
        currentPage,
        setCurrentPage,
        ...pages[currentPage],
    };
};

export const shuffleArray = (arr) => {
    let copyArr = copy(arr);
    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    for (var i = copyArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = copyArr[i];
        copyArr[i] = copyArr[j];
        copyArr[j] = temp;
    }
    return copyArr;
};
