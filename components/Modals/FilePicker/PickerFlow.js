import FileItemList from "./PickerFlow.FileItemList";
import PickerFlowDropzone from "./PickerFlow.Dropzone";
import UrlUploader from "./PickerFlow.UrlUploader";

export default function PickerMode() {
    return (
        <div className="inner">
            <div className="title-1">File Picker</div>
            <div className="text-blue-500 font-bold my-2 mx-0">
                Choose or Upload an Image
            </div>
            <FileItemList />
            <div className="divider" />
            <UrlUploader />
            <PickerFlowDropzone />
        </div>
    );
}
