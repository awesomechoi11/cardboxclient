// import { useIsMobile } from "../../mediaQueryHooks";
import { useRouter } from "next/router";
import Button from "@components/general/Button";
import { normalizeImageSrc } from "@components/general/NormalizedImage";
import UnlabeledPill from "@components/general/UnlabeledPill";

export default function LargeCardBanner({ data }) {
    const { tags, title, description, image, cards } = data;
    // const isMobile = useIsMobile();
    let imgSrc = normalizeImageSrc(image);
    const router = useRouter();
    // {imgSrc && (
    //   <div className="left">
    //     {/* eslint-disable-next-line @next/next/no-img-element */}
    //     <img src={imgSrc} alt="banner" />
    //   </div>
    // )}
    return (
        <div className="w-full flex flex-col">
            <div className="mb-4">
                <div className="title-1 text-xl font-semibold text-blue-900 my-1 ">
                    {title}
                </div>
                <div className="text-blue-500 font-bold my-2 mx-0 flex gap-1 flex-wrap">
                    {tags.map((tag) => (
                        <UnlabeledPill key={tag}>{tag}</UnlabeledPill>
                    ))}
                </div>
                <div className=" mt-2 mx-0 text-blue-800 break-words">
                    {description}
                </div>
            </div>
            <div className="text-blue-800 font-bold my-0 mb-2">
                Interactive Study Modes
            </div>
            <div className="mb-2">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                        router.push(`/cardpack/${data._id}/match`);
                    }}
                    className="shadow-[0_2px_6px_0px_rgba(0,0,0,0.3)]"
                >
                    Match
                </Button>
            </div>
        </div>
    );
}
