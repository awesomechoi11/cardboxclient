import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { pickerIncomingFileItemState } from "./PickerFlow.FileItemList";
import { alphaNumId } from "../../utils";

export default function PickerFlowDropzone() {
    const [incomingFiles, setIncomingFiles] = useRecoilState(
        pickerIncomingFileItemState
    );
    const { getRootProps, getInputProps } = useDropzone({
        onDropAccepted: (acceptedFiles) => {
            console.log("112331231212", acceptedFiles);
            setIncomingFiles([
                ...acceptedFiles.map((file) => ({
                    value: file,
                    type: "incoming",
                    previewUrl: URL.createObjectURL(file),
                    key: alphaNumId(),
                })),
                ...incomingFiles,
            ]);
        },
        accept: "image/*",
        // multiple: false,
        // maxFiles: 1,
        maxSize: 5000000, // 5mb max
        // onDragEnter: () => setIsDragging(true),
        // onDragLeave: () => setIsDragging(false),
    });

    return (
        <div {...getRootProps({ className: "dropzone" })}>
            <div className="inner">
                {Dropzone_SVG}
                <div className="text subtitle-2">
                    Drag your photos here to start uploading
                    <br />
                    <br />
                    or
                </div>
                <Button className="cta" size="sm">
                    Browse Files
                </Button>
            </div>
            <input {...getInputProps()} />
        </div>
    );
}

const Dropzone_SVG = (
    <svg
        width="400w"
        height="300w"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M187.167 60.3337C186.68 60.3337 186.214 60.5268 185.87 60.8706C185.526 61.2144 185.333 61.6808 185.333 62.167V87.8337C185.333 88.3199 185.526 88.7862 185.87 89.13C186.214 89.4738 186.68 89.667 187.167 89.667H212.833C213.319 89.667 213.786 89.4738 214.13 89.13C214.473 88.7862 214.667 88.3199 214.667 87.8337V73.167C214.667 72.1545 215.487 71.3337 216.5 71.3337C217.512 71.3337 218.333 72.1545 218.333 73.167V87.8337C218.333 89.2924 217.754 90.6913 216.722 91.7227C215.691 92.7542 214.292 93.3337 212.833 93.3337H187.167C185.708 93.3337 184.309 92.7542 183.277 91.7227C182.246 90.6913 181.667 89.2924 181.667 87.8337V62.167C181.667 60.7083 182.246 59.3094 183.277 58.2779C184.309 57.2465 185.708 56.667 187.167 56.667H201.833C202.846 56.667 203.667 57.4878 203.667 58.5003C203.667 59.5128 202.846 60.3337 201.833 60.3337H187.167Z"
            fill="#9E694F"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M190.342 65.3424C191.202 64.4829 192.368 64 193.583 64C194.799 64 195.965 64.4829 196.824 65.3424C197.684 66.202 198.167 67.3678 198.167 68.5833C198.167 69.7989 197.684 70.9647 196.824 71.8242C195.965 72.6838 194.799 73.1667 193.583 73.1667C192.368 73.1667 191.202 72.6838 190.342 71.8242C189.483 70.9647 189 69.7989 189 68.5833C189 67.3678 189.483 66.202 190.342 65.3424ZM193.583 67.6667C193.34 67.6667 193.107 67.7632 192.935 67.9352C192.763 68.1071 192.667 68.3402 192.667 68.5833C192.667 68.8264 192.763 69.0596 192.935 69.2315C193.107 69.4034 193.34 69.5 193.583 69.5C193.826 69.5 194.06 69.4034 194.232 69.2315C194.403 69.0596 194.5 68.8264 194.5 68.5833C194.5 68.3402 194.403 68.1071 194.232 67.9352C194.06 67.7632 193.826 67.6667 193.583 67.6667Z"
            fill="#9E694F"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M206.037 70.037C206.753 69.321 207.914 69.321 208.63 70.037L217.797 79.2036C218.512 79.9196 218.512 81.0804 217.797 81.7964C217.081 82.5123 215.92 82.5123 215.204 81.7964L207.333 73.9261L188.463 92.7964C187.747 93.5123 186.586 93.5123 185.87 92.7964C185.155 92.0804 185.155 90.9196 185.87 90.2036L206.037 70.037Z"
            fill="#9E694F"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M212.833 54.833C213.846 54.833 214.667 55.6538 214.667 56.6663V67.6663C214.667 68.6789 213.846 69.4997 212.833 69.4997C211.821 69.4997 211 68.6789 211 67.6663V56.6663C211 55.6538 211.821 54.833 212.833 54.833Z"
            fill="#9E694F"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M205.5 62.1663C205.5 61.1538 206.321 60.333 207.333 60.333H218.333C219.346 60.333 220.167 61.1538 220.167 62.1663C220.167 63.1789 219.346 63.9997 218.333 63.9997H207.333C206.321 63.9997 205.5 63.1789 205.5 62.1663Z"
            fill="#9E694F"
        />
        <rect
            x="0.5"
            y="0.5"
            width="399"
            height="299"
            rx="31.5"
            stroke="black"
            strokeDasharray="5 5"
        />
    </svg>
);
