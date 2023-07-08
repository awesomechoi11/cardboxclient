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
        className="cursor-pointer text-center py-1 px-0"
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
