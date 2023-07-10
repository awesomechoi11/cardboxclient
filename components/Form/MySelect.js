import { useField, useFormikContext } from "formik";
import React from "react";
import { ErrComponent } from "./Basic";
import Select from "react-select";

export function MySelect({ label, controlId, options, ...props }) {
    props.name = controlId;
    const [field, meta, helper] = useField(props);
    const { isSubmitting } = useFormikContext();

    const value = options.find((option) => option.value === field.value);
    return (
        <div>
            <label htmlFor={controlId}>{label}</label>
            <Select
                id={controlId}
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
            {meta.touched && meta.error ? (
                <div className="m-2 text-red-600">
                    <ErrComponent err={meta.error} />
                </div>
            ) : null}
        </div>
    );
}
