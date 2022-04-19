import { Formik } from "formik";
import { MyForm, MySubmitButton, MyTextInput } from "../../Form/Basic";
import { useUploadImage } from "../../UploadCare/useUpload";
import * as Yup from "yup";
import { useRecoilState } from "recoil";
import { pickerIncomingFileItemState } from "./PickerFlow.FileItemList";
import { alphaNumId } from "../../utils";

export default function UrlUploader() {
    const [incomingFiles, setIncomingFiles] = useRecoilState(
        pickerIncomingFileItemState
    );
    return (
        <Formik
            enableReinitialize
            initialValues={{
                url: "",
            }}
            validationSchema={Yup.object({
                url: Yup.string().url("Not a valid url!").required("Required"),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                // do stuff
                // upload(values.url).then(() => {
                //     setSubmitting(false);
                // });
                // test url
                // https://ucarecdn.com/2a4aa3a3-8060-47b2-8f9a-4919e3ef9460%2F
                setIncomingFiles([
                    {
                        value: values.url,
                        type: "incomingUrl",
                        key: alphaNumId(),
                    },
                    ...incomingFiles,
                ]);
                resetForm();
                setSubmitting(false);
            }}
        >
            <MyForm id="uploadbyurl-form">
                <MyTextInput
                    label="Paste Image Url"
                    controlId="url"
                    size="sm"
                />
                <MySubmitButton size="sm">Upload</MySubmitButton>
            </MyForm>
        </Formik>
    );
}
