import FileItemList from "./PickerFlow.FileItemList";
import PickerFlowDropzone from "./PickerFlow.Dropzone";

export default function PickerMode() {
    return (
        <div className="inner">
            <div className="title-1">File Picker</div>
            <div className="subtitle-1">Choose or Upload an Image</div>
            <FileItemList />
            <PickerFlowDropzone />
        </div>
    );
}
