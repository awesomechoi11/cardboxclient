import { useField, useFormikContext } from "formik";
import Form from "react-bootstrap/Form";
import React from "react";
import { ErrComponent } from "./Basic";
import Select from "react-select";

export function MySelect({ label, controlId, options, ...props }) {
    props.name = controlId;
    const [field, meta, helper] = useField(props);
    const { isSubmitting } = useFormikContext();

    const value = options.find((option) => option.value === field.value);
    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Select
                styles={{
                    control: (provided) => ({
                        ...provided,
                        backgroundColor: "var(--color-secondary-1)",
                        borderColor: "var(--color-secondary-3)",
                    }),
                    menu: (provided) => ({
                        ...provided,
                        backgroundColor: "var(--color-secondary-1)",
                    }),
                    option: (provided, state) => {
                        return {
                            ...provided,
                            color: "var(--color-primary-1)",
                            backgroundColor: state.isSelected
                                ? "var(--color-secondary-2)"
                                : "var(--color-secondary-1)",
                            "&:hover": {
                                backgroundColor: "var(--color-secondary-3)",
                            },
                        };
                    },
                }}
                options={options}
                aria-label={label}
                name={field.name}
                value={value}
                // defaultValue={value}
                onChange={(option) => {
                    helper.setValue(option.value);
                }}
                onBlur={field.onBlur}
                {...props}
                disabled={isSubmitting}
            />
            {/* <Form.Select
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
            </Form.Select> */}
            {meta.touched && meta.error ? (
                <div className="form-error">
                    <ErrComponent err={meta.error} />
                </div>
            ) : null}
        </Form.Group>
    );
}
