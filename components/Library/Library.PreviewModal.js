import { ModalWrapper, useModal } from "@components/Modals/ModalUtils";
import { ActiveOnViewportEnter } from "@components/general/ActiveOnViewportEnter";
import CardRow from "@components/CardPack/general/CardHorizontal";
import Button from "@components/general/Button";
import Text from "@components/general/Text";
import Link from "next/link";
import useDeletePackMutation from "@components/Mongo/CardPack/useDeletePackMutation";
import { toast } from "react-toastify";

export function LibraryPreviewModal() {
    return (
        <ModalWrapper
            modalId="library result preview"
            innerClassName="px-3 py-4 tablet:px-3 tablet:py-4 desktop:px-3 desktop:py-4 bg-blue-200 w-full tablet:w-[600px] desktop:w-[860px]"
        >
            <Inner />
        </ModalWrapper>
    )
}

function Inner() {
    const { data: { data, refetch }, closeModal } = useModal("library result preview");

    const { title, cards, _id } = data;
    const deleteMutation = useDeletePackMutation({
        cardPackId: _id,
    });
    console.log(data);

    return (
        <div className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-3 tablet:flex-row">
                <div className="flex-grow">
                    <div className="text-blue-950 text-[24px] font-semibold">

                        <Text>{title || "untitled"}</Text>
                    </div>
                    {/* <div>ratings here</div> */}
                </div>
                <div className="flex flex-row-reverse justify-end flex-shrink-0 gap-1 tablet:items-start">
                    {data.published &&
                        <Button variant="secondary"
                            onClick={() => {
                                navigator.clipboard.writeText(`https://flippy.cards/cardpack/${_id}`);
                            }}
                        >Share
                        </Button>
                    }
                    <Link
                        href={`/editor/${_id}`}
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        <Button>Edit</Button>
                    </Link>
                    <Button
                        variant="danger"
                        onClick={() => {
                            deleteMutation.mutate(undefined, {
                                onSuccess: () => {
                                    toast.success(
                                        "Your card pack was successfully deleted!"
                                    );
                                    refetch();
                                    closeModal();
                                },
                            })

                        }
                        }
                    >
                        Delete
                    </Button>

                </div>
            </div>
            <div className="flex flex-col gap-2">
                {cards && cards.map(data => (
                    <ActiveOnViewportEnter key={data._id}>
                        <CardRow data={data} />
                    </ActiveOnViewportEnter>
                ))}
            </div>
            {data.published &&
                <Link
                    href={`/cardpack/${_id}`}
                    onClick={() => {
                        closeModal();
                    }}
                >
                    <Button className="w-full text-center">View Full Set</Button>
                </Link>}
        </div>
    );
}