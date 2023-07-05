import { Form, Formik } from "formik";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import * as Yup from "yup";
import { CardPackDataContext } from "../../pages/card-pack-editor/[cardPackId]";
import { MyTextInput } from "../Form/Basic";
import { MySelect } from "../Form/MySelect";
import { useMongo } from "../Mongo/MongoUtils";
import MyFilePicker from "../MyFilePicker";
import CreatePackDetailsAutoSave from "./CreatePackDetailsAutoSave";
import CreatePackPublish from "./CreatePackPublish";
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

  const { data } = useContext(CardPackDataContext);

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
      <Form
        id="CreatePack-form"
        className="flex justify-between w-full gap-[24rem] "
      >
        <CreatePackDetailsAutoSave
          onUpdate={(newDoc) => {
            if (db) mutation.mutate([db, newDoc]);
          }}
        />
        <div className="left w-[198rem]">
          <div className="text-center flex flex-col gap-3">
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
          </div>
        </div>
        <div className="flex-grow">
          <div className="text-center flex flex-col gap-3">
            <MyTextInput label="Title" controlId="title" />
            <MyTextInput label="Tags (separated by commas)" controlId="tags" />
            <MyTextInput
              label="Description"
              controlId="description"
              as="textarea"
              rows={5}
            />
          </div>
        </div>
        <div className="w-[200rem]">
          <div className="text-center flex flex-col gap-3">
            <MySelect
              label="Visibility"
              controlId="visibility"
              options={selectOptions}
            />
            <CreatePackPublish />
          </div>
        </div>
      </Form>
    </Formik>
  );
}
