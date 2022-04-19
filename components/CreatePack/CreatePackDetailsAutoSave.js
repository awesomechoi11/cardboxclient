import { useFormikContext } from "formik";
import { useEffect, useRef } from "react";
import fastEqual from "fast-deep-equal";
import { useDebounce } from "rooks";
import { useRecoilValue } from "recoil";
import { createPackManualSaveTrigger } from "./_CreatePackUtils";

export default function CreatePackDetailsAutoSave({ onUpdate }) {
    const { isValid, values } = useFormikContext();
    const prevValRef = useRef(values);

    const updateDebounced = useDebounce(onUpdate, 500);
    const triggerCount = useRecoilValue(createPackManualSaveTrigger);
    useEffect(() => {
        // if fields r valid and different from previous
        if (!fastEqual(prevValRef.current, values)) {
            prevValRef.current = values;
            let tags = values.tags.split(",").map((item) => item.trim());
            updateDebounced({
                $set: { ...values, tags },
                $currentDate: { lastModified: true },
            });
        }
    }, [values]);

    // console.log(triggerCount);
    useEffect(() => {
        if (triggerCount && isValid) {
            let tags = values.tags.split(",").map((item) => item.trim());
            updateDebounced({
                $set: { ...values, tags },
                $currentDate: { lastModified: true },
            });
        }
    }, [triggerCount]);

    return null;
}
