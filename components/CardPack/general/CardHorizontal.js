import ImageViewer from "@components/Modals/ImageViewer/ImageViewer";
import { normalizeImageSrc } from "@components/general/NormalizedImage";
import draftjsToHtml from "draftjs-to-html";
import { BlankCardFace } from "./BlankCardFace";

export default function CardHorizontal({ data, active }) {
    const { term, definition } = data;

    return (
        <div className="relative flex w-full px-6 py-2 bg-blue-100 shadow-xl rounded-xl">
            <div className="border-r border-[D3D3D3] w-1/2 flex-grow-0  box-border flex items-center flex-shrink-0 mr-3">
                {term && <CardFace data={term} />}
            </div>
            <div className="flex flex-col items-center flex-grow gap-3">
                {definition && <CardFace data={definition} />}
            </div>
            <BlankCardFace active={active} />
        </div>
    );
}

function CardFace({ data }) {
    const { image, content } = data;
    let imgSrc = normalizeImageSrc(image);
    return (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {imgSrc && <ImageViewer imgData={data.image} />}
            <div
                className="break-words"
                dangerouslySetInnerHTML={{ __html: draftjsToHtml(content) }}
            />
        </>
    );
}
