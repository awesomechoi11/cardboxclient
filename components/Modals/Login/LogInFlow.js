import Button from "@components/general/Button";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import * as Realm from "realm-web";
import * as Yup from "yup";
import { MySubmitButton, MyTextInput } from "../../Form/Basic";
import { EmailSchema, PasswordSchema } from "../../Form/_validation";
import { toastifyMongoErrors, useMongo } from "../../Mongo/MongoUtils";
import { useModal } from "../ModalUtils";

export default function LogInFlow({ setMode }) {
    const [stage, setStage] = useState("one");
    const data = useRef();
    return (
        <div className="signup-flow">
            {stage === "one" && (
                <StageOne setStage={setStage} setMode={setMode} data={data} />
            )}
            {stage === "two" && <StageTwo />}
            {stage === "three" && (
                <StageThree setStage={setStage} data={data} />
            )}
        </div>
    );
}

function StageOne({ setStage, setMode, data }) {
    const { loginEmailPassword } = useMongo();
    return (
        <>
            <div className="title-1">Log In</div>
            <div className="description-1">
                Create, Share, and Learn with Flippy
            </div>

            <Formik
                initialValues={{
                    formBasicEmail: "",
                    formBasicPassword: "",
                }}
                validationSchema={Yup.object({
                    formBasicEmail: EmailSchema,
                    formBasicPassword: PasswordSchema,
                })}
                onSubmit={(values, { setSubmitting }) => {
                    // do stuff
                    loginEmailPassword(
                        values.formBasicEmail,
                        values.formBasicPassword
                    )
                        .then(() => {
                            setStage("two");
                        })
                        .catch((err) => {
                            data.current = values.formBasicEmail;
                            if (err instanceof Realm.MongoDBRealmError) {
                                const { error, statusCode } = err;
                                const errorType = error || statusCode;
                                switch (errorType) {
                                    case "confirmation required":
                                        // Email is already registered
                                        setStage("three");
                                        break;
                                }
                            }
                            console.log(err);
                            toastifyMongoErrors(err);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                <Form>
                    <MyTextInput
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        controlId="formBasicEmail"
                    />
                    <MyTextInput
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        controlId="formBasicPassword"
                    />
                    <MySubmitButton variant="primary">Log In</MySubmitButton>
                </Form>
            </Formik>
            <div
                className="subtitle-1 switch"
                onClick={() => {
                    setMode("signup");
                }}
            >
                New here? Create an account.
            </div>
        </>
    );
}

function StageTwo() {
    const { closeModal } = useModal("login/signup");
    return (
        <>
            <div className="img">
                <Image
                    width="360"
                    height="364"
                    className="object-contain"
                    src="/assets/img/Study_Cat.png"
                    alt="cute cate - logged in"
                />
            </div>
            <div className="message">
                <div className="title-1">Logged In!</div>
                <div className="subtitle-2">
                    You may safely exit this modal.
                    <br />
                    Have fun studying!
                </div>
            </div>
            <Button
                variant="primary"
                className="action-btn"
                onClick={() => {
                    closeModal();
                }}
            >
                Continue
            </Button>
        </>
    );
}

function StageThree({ data, setStage }) {
    const { resendConfirmationEmail } = useMongo();

    return (
        <>
            <div className="img">
                <Image
                    width="360"
                    height="243"
                    className="object-contain"
                    src="/assets/img/Registration_3.png"
                    alt="cute cate - email not sent"
                />
            </div>
            <div className="message">
                <div className="title-1">You seem familiar...</div>
                <div className="subtitle-2">
                    You already registered! But did you confirm your email?
                </div>
            </div>
            <Button>Log In</Button>
            <Formik
                initialValues={{
                    formBasicEmail: data.current,
                }}
                validationSchema={Yup.object({
                    formBasicEmail: EmailSchema,
                })}
                onSubmit={(values, { setSubmitting }) => {
                    // do stuff
                    resendConfirmationEmail(values.formBasicEmail)
                        .catch((e) => {
                            console.log(e);
                            toastifyMongoErrors(e);
                        })
                        .finally(() => {
                            setTimeout(() => {
                                setSubmitting(false);
                            }, 5000);
                        });
                }}
            >
                <Form>
                    <MyTextInput
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        controlId="formBasicEmail"
                    />
                    <MySubmitButton variant="primary">
                        Resend Email
                    </MySubmitButton>
                </Form>
            </Formik>
        </>
    );
}
