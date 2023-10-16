import { Form, Formik } from "formik";
import { useRecoilState } from "recoil";
import * as Yup from "yup";
import { MySubmitButton, MyTextInput } from "../../Form/Basic";
import { alphaNumId } from "../../utils";
import { pickerIncomingFileItemState } from "./PickerFlow.FileItemList";

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
            <Form id="uploadbyurl-form" className="flex-grow-1 mb-3">
                <div className="flex gap-3">
                    <div className="flex-grow-1 text-left">
                        <MyTextInput
                            label="Paste Image Url"
                            controlId="url"
                            size="sm"
                        />
                    </div>
                    <MySubmitButton size="sm" className="mt-[36px] h-[58px]">Upload</MySubmitButton>
                </div>

            </Form>
        </Formik>
    );
}
