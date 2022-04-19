import { ModalWrapper, useModal } from "../ModalUtils";
import PickerMode from "./PickerFlow";

export default function FilePickerModal() {
    const { data } = useModal("file picker");

    return (
        <ModalWrapper modalId="file picker" className="file-picker-modal">
            {data && <Inner />}
        </ModalWrapper>
    );
}

function Inner() {
    const { data } = useModal("file picker");
    return (
        <>
            {data.mode === "picker" && <PickerMode />}
            {data.mode === "confirm" && <ConfirmMode />}
            {data.mode === "edit" && <EditMode />}
        </>
    );
}

function ConfirmMode() {
    // const {
    //     data: { setFile },
    // } = useModal("file picker");

    return (
        <div className="inner">
            <div className="title-1">File Picker</div>
            <div className="subtitle-1">Confirm Your Choice</div>
            <div>image preview</div>
            <div>confirm , go back , or edit</div>
        </div>
    );
}

function EditMode() {
    return (
        <div className="inner">
            <div className="title-1">File Picker</div>
            <div className="subtitle-1">Edit Your Image</div>
            <div>image preview</div>
            <div>edit controls</div>
            <div>cancel or finish</div>
        </div>
    );
}
