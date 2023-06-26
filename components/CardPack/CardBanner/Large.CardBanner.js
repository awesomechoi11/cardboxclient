// import { useIsMobile } from "../../mediaQueryHooks";
import { useRouter } from "next/router";
import Button from "@components/general/Button";

export default function LargeCardBanner({ data }) {
    const { tags, title, description, image, cards } = data;
    // const isMobile = useIsMobile();
    let imgSrc = normalizeImageSrc(image);
    const router = useRouter();
    return (
        <div className="large-card-banner">
            {imgSrc && (
                <div className="left">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgSrc} alt="banner" />
                </div>
            )}
            <div className="right">
                <div className="top">
                    <div className="title-1">{title}</div>
                    <div className="subtitle-1">
                        {[cards.length + " cards", ...tags].join(" · ")}
                    </div>
                    <div className="description-1">{description}</div>
                </div>
                <div className="subtitle-2">Interactive Study Modes</div>
                <div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                            router.push(`/card-pack/${data._id}/match`);
                        }}
                    >
                        Match
                    </Button>
                </div>
            </div>
        </div>
    );
}
