import { useField, useFormikContext } from "formik";
import Form from "react-bootstrap/Form";
import React from "react";
import { ErrComponent } from "./Basic";

export function MySelect({ label, controlId, options, ...props }) {
    props.name = controlId;
    const [field, meta] = useField(props);
    const { isSubmitting } = useFormikContext();

    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Select
                aria-label={label}
                {...props}
                {...field}
                disabled={isSubmitting}
            >
                {options.map(({ value, label }, index) => (
                    <option value={value} key={index}>
                        {label || value}
                    </option>
                ))}
            </Form.Select>
            {meta.touched && meta.error ? (
                <div className="form-error">
                    <ErrComponent err={meta.error} />
                </div>
            ) : null}
        </Form.Group>
    );
}
