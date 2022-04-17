import { Formik } from "formik";
import { MyForm, MyTextInput } from "../Form/Basic";
import * as Yup from "yup";
import { MySelect } from "../Form/MySelect";
import CreatePackDetailsAutoSave from "./CreatePackDetailsAutoSave";
import { useModal } from "../Modals/ModalUtils";
import { useMongo } from "../Mongo/MongoUtils";
import { useContext, useState } from "react";
import Image from "next/image";
import MyFilePicker from "../MyFilePicker";
import { useMutation } from "react-query";
import { CardPackDataContext } from "../../pages/card-pack-editor/[cardPackId]";
import { useSetRecoilState } from "recoil";
import { createPackSaveSelector } from "./_CreatePackUtils";

export default function CreatePackDetailsForm() {
    const selectOptions = [
        {
            value: "public",
            label: "Public",
        },
        {
            value: "private",
            label: "Private",
        },
        {
            value: "hidden",
            label: "Hidden",
        },
    ];

    const data = useContext(CardPackDataContext);
    console.log(data);

    const { db } = useMongo();

    const setSaveState = useSetRecoilState(createPackSaveSelector);
    const mutation = useMutation(
        ([localdb, updateDoc, options]) => {
            return localdb.collection("cardpackDrafts").updateOne(
                {
                    _id: data._id,
                },
                updateDoc,
                options
            );
        },
        {
            onMutate: () => {
                setSaveState({ saving: true });
            },
            onSettled: () => {
                setSaveState({ saving: false, lastUpdated: new Date() });
            },
        }
    );

    return (
        <Formik
            enableReinitialize
            initialValues={{
                visibility: data.visibility,
                title: data.title,
                tags: data.tags.join(", "),
                description: data.description,
            }}
            validationSchema={Yup.object({
                visibility: Yup.string().required("Required"),
                title: Yup.string()
                    .min(4, "Must be 4 characters or more")
                    .max(254, "Must be 254 characters or less")
                    .required("Required"),
                tags: Yup.string()
                    .min(4, "Must be 4 characters or more")
                    .max(254, "Must be 254 characters or less")
                    .required("Required"),
                description: Yup.string()
                    .min(4, "Must be 4 characters or more")
                    .max(254, "Must be 254 characters or less"),
                // .required("Required"),
            })}
        >
            <MyForm id="CreatePack-form">
                <CreatePackDetailsAutoSave
                    onUpdate={(newDoc) => {
                        if (db) mutation.mutate([db, newDoc]);
                    }}
                />
                <div className="left">
                    <MyFilePicker
                        initialValue={data.image}
                        onUpdate={(file) => {
                            if (db)
                                mutation.mutate([
                                    db,
                                    {
                                        $set: { image: file },
                                        $currentDate: { lastModified: true },
                                    },
                                ]);
                        }}
                    />

                    <MySelect
                        label="Visibility"
                        controlId="visibility"
                        options={selectOptions}
                    />
                </div>
                <div className="right">
                    <MyTextInput label="Title" controlId="title" />
                    <MyTextInput
                        label="Tags (separated by commas)"
                        controlId="tags"
                    />
                    <MyTextInput label="Description" controlId="description" />
                </div>
            </MyForm>
        </Formik>
    );
}
