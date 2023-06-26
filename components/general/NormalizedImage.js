import Image from "next/image";

export function normalizeImageSrc(imageContent) {
    switch (imageContent.type) {
        case "uploadcare":
            return imageContent.value.cdnUrl;
        case "uploadcare0.7":
            return imageContent.value.original_file_url;
        case "cloudflare":
            return imageContent.value.variants[0];
    }
}

export default function NormalizedImage({ imageContent, ...props }) {
    let { imgSrc } = normalizeImageSrc(imageContent);

    return <Image src={imgSrc} {...props} />;
}
