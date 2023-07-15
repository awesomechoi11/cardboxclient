import { useField, useFormikContext } from "formik";
import React from "react";
import { ErrComponent } from "./Basic";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

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
                unstyled
                classNames={{
                    control: () =>
                        "bg-blue-100 border-blue-400 py-2 border-[1px] px-2 rounded-lg cursor-pointer",
                    menu: () =>
                        "bg-blue-200 rounded-lg shadow-lg rounded-lg overflow-hidden",
                    option: (state) => {
                        return twMerge(
                            state.isSelected ? "bg-blue-300" : "bg-blue-100",
                            "text-blue-800 hover:bg-blue-200 py-2 transition-colors cursor-pointer"
                        );
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
