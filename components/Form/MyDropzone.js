import clsx from "clsx";
import { useField, useFormikContext } from "formik";
import { Form } from "@components/general/Button";
import { useDropzone } from "react-dropzone";
import { ErrComponent } from "./Basic";

// need to have setFiles
// formik cant control it
// so it just updates formik as effect

export function MyDropzone({
    label,
    controlId,
    options,
    children,
    setFiles,
    onUpdate,
    ...props
}) {
    props.name = controlId;
    const [field, meta, helpers] = useField(props);
    const { onDropAccepted } = options;
    const { isSubmitting } = useFormikContext();
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        disabled: isSubmitting,
        ...options,
        onDropAccepted: (files) => {
            helpers.setValue(files, false);
            onUpdate && onUpdate(files);
            onDropAccepted && onDropAccepted(files);
        },
    });

    return (
        <Form.Group
            controlId={controlId}
            {...getRootProps()}
            className={clsx("dropzone-wrapper", isDragActive && "active")}
        >
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="file"
                {...getInputProps()}
                {...props}
                disabled={isSubmitting}
            />
            <div className="dropzone-inner">{children}</div>
            {meta.touched && meta.error ? (
                <div className="form-error">
                    <ErrComponent err={meta.error} />
                </div>
            ) : null}
            <div
                className="remove"
                onClick={(e) => {
                    e.stopPropagation();
                    helpers.setValue(null, false);
                    onUpdate && onUpdate(null);
                }}
            >
                Remove
            </div>
        </Form.Group>
    );
}

/**
 
                    <MyDropzone
                        label="Pack Image (Optional)"
                        controlId="image"
                        onUpdate={(files) => {
                            if (files && files?.length) {
                                setFiles(
                                    files.map((file) =>
                                        Object.assign(file, {
                                            preview: URL.createObjectURL(file),
                                        })
                                    )
                                );
                                compressImageFile(files.[0])
                                    .then(uploadImage)
                            } else {
                                setFiles(null);
                            }
                        }}
                        options={{
                            accept: "image/jpeg",
                            multiple: false,
                            maxFiles: 1,
                            maxSize: 1000000,
                            onDragEnter: () => setIsDragging(true),
                            onDragLeave: () => setIsDragging(false),
                        }}
                    >
                        {files?.[0] || data.image?.cdnUrl ? (
                            <div className="preview-image">
                                <Image
                                    layout="fill"
                                    src={files[0].preview || data.image?.cdnUrl}
                                    alt="drag n drop"
                                />
                            </div>
                        ) : !isDragging ? (
                            <Image
                                width="135w"
                                height="105.5w"
                                objectFit="contain"
                                layout="responsive"
                                src="/assets/img/photo.png"
                                alt="cute cate -  photo zone"
                            />
                        ) : (
                            <Image
                                width="135w"
                                height="105.5w"
                                objectFit="contain"
                                layout="responsive"
                                src="/assets/img/circle.png"
                                alt="cute cate -  photo zone drop"
                            />
                        )}
                    </MyDropzone> 
 */
