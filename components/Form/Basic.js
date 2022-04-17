import { useField, useFormikContext } from "formik";
import Form from "react-bootstrap/Form";
import React from "react";
import { Button } from "react-bootstrap";
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

//https://github.com/jaredpalmer/formik/blob/master/packages/formik/src/Form.tsx
export const MyForm = React.forwardRef(function MyForm(props, ref) {
    // iOS needs an "action" attribute for nice input: https://stackoverflow.com/a/39485162/406725
    // We default the action to "#" in case the preventDefault fails (just updates the URL hash)
    const { action, ...rest } = props;
    const _action = action ?? "#";
    const { handleReset, handleSubmit } = useFormikContext();
    return (
        <Form
            onSubmit={handleSubmit}
            ref={ref}
            onReset={handleReset}
            action={_action}
            {...rest}
        />
    );
});

export const ErrComponent = ({ err }) => {
    switch (err) {
        case "password":
            return (
                <>
                    Must Contain the following:
                    <ul>
                        <li>8 Characters</li>
                        <li>1 Uppercase </li>
                        <li>1 Lowercase </li>
                        <li>1 Number </li>
                        <li>1 Special Case Character </li>
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
        <Form.Group controlId={controlId} className="my-text-input">
            <Form.Label>{label}</Form.Label>
            <Form.Control {...props} {...field} disabled={isSubmitting} />
            {meta.touched && meta.error ? (
                <div className="form-error">
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
