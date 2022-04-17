import { useIsMobile } from "../../mediaQueryHooks";

export default function LargeCardBanner({ data }) {
    const { tags, title, description, image, cards } = data;
    // const isMobile = useIsMobile();
    const imgSrc = image?.value?.cdnUrl;

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
                <div className="bottom"> like n share</div>
            </div>
        </div>
    );
}
