import Button from "@components/general/Button";
import PlaceholderColumn from "../../PlaceholderColumn";
import { ModalWrapper, useModal } from "../ModalUtils";
import { useRouter } from "next/router";

export default function PublishModal() {
    const { data, closeModal } = useModal("publish");
    const router = useRouter();
    return (
        <ModalWrapper modalId="publish" className="publish-modal">
            <PlaceholderColumn
                options={{
                    imageKey: "studyCat",
                    message: {
                        title: "Yay!! Good Job",
                        description:
                            "Your card pack has been successfully published",
                    },
                    actionComponent: (
                        <>
                            <Button
                                onClick={() => {
                                    router.push(data.url);
                                    closeModal();
                                }}
                            >
                                See Published Pack
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    closeModal();
                                }}
                            >
                                Close Modal & Keep Editing
                            </Button>
                        </>
                    ),
                }}
            />
        </ModalWrapper>
    );
}
