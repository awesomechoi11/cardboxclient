import Button from "@components/general/Button";
import { useContext } from "react";
import { CardPackDataContext } from "../../pages/editor/[cardPackId]";
import usePublishPackMutation from "../Mongo/CardPack/usePublishPackMutation";
import ago from "s-ago";
import { useRecoilState } from "recoil";
import { createPackSaveSelector } from "./_CreatePackUtils";
import useDeletePackMutation from "../Mongo/CardPack/useDeletePackMutation";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useModal } from "../Modals/ModalUtils";

export default function CreatePackPublish() {
    const { data: dbdata, refetch } = useContext(CardPackDataContext);

    const publishMutation = usePublishPackMutation({
        cardPackId: dbdata._id,
    });
    const deleteMutation = useDeletePackMutation({
        cardPackId: dbdata._id,
    });
    const [saveState, setSaveState] = useRecoilState(createPackSaveSelector);
    const { lastModified, lastPublished, published } = dbdata;
    const canBePublished =
        !published ||
        lastModified > lastPublished ||
        saveState.lastUpdated > lastPublished;
    const router = useRouter();
    const { openModal } = useModal("publish");
    return (
        <>
            <Button
                onClick={() =>
                    publishMutation.mutate(undefined, {
                        onSuccess: () => {
                            refetch();
                            openModal({ url: `/cardpack/${dbdata._id}` });
                        },
                    })
                }
                className="w-full"
                disabled={
                    publishMutation.isLoading ||
                    !canBePublished ||
                    deleteMutation.isLoading
                }
            >
                {published
                    ? canBePublished
                        ? "Publish Update"
                        : "Up To Date"
                    : "Publish"}
            </Button>
            <div>
                {canBePublished &&
                    lastPublished &&
                    "Last Published: " + ago(lastPublished)}
            </div>
            <br />

            <Button
                variant="danger"
                className="w-full"
                onClick={() =>
                    deleteMutation.mutate(undefined, {
                        onSuccess: () => {
                            toast.success(
                                "Your card pack was successfully deleted!"
                            );
                            router.push("/library");
                        },
                    })
                }
                disabled={publishMutation.isLoading || deleteMutation.isLoading}
            >
                Delete
            </Button>
        </>
    );
}
