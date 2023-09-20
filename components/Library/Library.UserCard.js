import CardRow from "@components/CardPack/general/CardHorizontal";
import { ModalWrapper, useModal } from "@components/Modals/ModalUtils";
import { ActiveOnViewportEnter } from "@components/general/ActiveOnViewportEnter";
import { useMongo } from "../Mongo/MongoUtils";
import Button from "@components/general/Button";
import Text from "@components/general/Text";
import Link from "next/link";
import { useIsMobile } from "@components/mediaQueryHooks";
import { useRouter } from "next/router";

export default function LibraryUserCard({ data }) {
    //   console.log(cardData);
    const { title, cardsCount } = data;
    const { openModal } = useModal("search result preview");

    return (
        //The div below is the card on the search page
        <>
        </>
    )
}

export function SearchResultPreviewModal() {
    return (
        <ModalWrapper
            modalId="search result preview"
            innerClassName="px-3 py-4 tablet:px-3 tablet:py-4 desktop:px-3 desktop:py-4 bg-blue-200 w-full tablet:w-[600px] desktop:w-[860px]"
        >
            <Inner />
        </ModalWrapper>
    );
}

function Inner() {
    const { data, closeModal } = useModal("search result preview");

    const { title, previewCards, _id } = data;
    return (
        <div className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-3 tablet:flex-row">
                <div className="flex-grow">
                    <div className="text-blue-950 text-[24px] font-semibold">
                        <Text>{title}</Text>
                    </div>
                    {/* <div>ratings here</div> */}
                </div>
                <div className="flex flex-row-reverse justify-end flex-shrink-0 gap-1 tablet:items-start">
                    <Button variant="secondary">Share</Button>
                    <Link
                        href={`/cardpack/${_id}`}
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        <Button variant="secondary">Save</Button>
                    </Link>
                    <Button>Study</Button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {previewCards.map((data) => (
                    <ActiveOnViewportEnter key={data._id}>
                        <CardRow data={data} />
                    </ActiveOnViewportEnter>
                ))}
            </div>
            <Link
                href={`/cardpack/${_id}`}
                onClick={() => {
                    closeModal();
                }}
            >
                <Button className="w-full text-center">View Full Set</Button>
            </Link>
        </div>
    );
}