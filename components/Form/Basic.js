import { useField, useFormikContext, Form } from "formik";
import React from "react";
import Button from "@components/general/Button";
import clsx from "clsx";

export function MySubmitButton({ className, ...props }) {
    const { isSubmitting } = useFormikContext();
    return (
        <Button
            type="submit"
            className={clsx("submit", className)}
            disabled={isSubmitting}
            {...props}
        />
    );
}

export const ErrComponent = ({ err }) => {
    switch (err) {
        case "password":
            return (
                <>
                    Must Have At Least:
                    <ul>
                        <li>8 Characters</li>
                        <li>1 Uppercase (A-Z)</li>
                        <li>1 Lowercase (a-z)</li>
                        <li>1 Number (0-9)</li>
                        <li>
                            1 Special Case Character{" "}
                            {`(~!@#$%^&*_-+=\`|\\(){}[]:;"'<>,.?/)`}
                        </li>
                    </ul>
                </>
            );
        default:
            return <>{err}</>;
    }
};

export function MyTextInput({ label, controlId, ...props }) {
    props.name = controlId;
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    const { isSubmitting } = useFormikContext();

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={controlId} className="font-bold">
                {label}
            </label>
            <input {...props} {...field} disabled={isSubmitting} />
            {meta.touched && meta.error ? (
                <div className="mx-0 mt-0 mb-1 text-red-600">
                    <ErrComponent err={meta.error} />
                </div>
            ) : null}
        </div>
    );
}

export function MyTextArea({ label, controlId, ...props }) {
    props.name = controlId;
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    const { isSubmitting } = useFormikContext();

    return (
        <Form.Group controlId={controlId} className="flex flex-col gap-2">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as="textarea"
                rows={5}
                {...props}
                {...field}
                disabled={isSubmitting}
            />
            {meta.touched && meta.error ? (
                <div className="m-2 text-red-600">
                    <ErrComponent err={meta.error} />
                </div>
            ) : null}
        </Form.Group>
    );
}

// const MyCheckbox = ({ children, ...props }) => {
//     // React treats radios and checkbox inputs differently other input types, select, and textarea.

//     // Formik does this too! When you specify `type` to useField(), it will

//     // return the correct bag of props for you -- a `checked` prop will be included

//     // in `field` alongside `name`, `value`, `onChange`, and `onBlur`

//     const [field, meta] = useField({ ...props, type: "checkbox" });

//     return (
//         <div>
//             <label className="checkbox-input">
//                 <input type="checkbox" {...field} {...props} />

//                 {children}
//             </label>

//             {meta.touched && meta.error ? (
//                 <div className="error">{meta.error}</div>
//             ) : null}
//         </div>
//     );
// };

// const MySelect = ({ label, ...props }) => {
//     const [field, meta] = useField(props);

//     return (
//         <div>
//             <label htmlFor={props.id || props.name}>{label}</label>

//             <select {...field} {...props} />

//             {meta.touched && meta.error ? (
//                 <div className="error">{meta.error}</div>
//             ) : null}
//         </div>
//     );
// };
