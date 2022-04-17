import Head from "next/head";
import Navbar from "../components/Navbar";
import { toastifyMongoErrors, useMongo } from "../components/Mongo/MongoUtils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { MyForm, MySubmitButton, MyTextInput } from "../components/Form/Basic";
import { Formik } from "formik";
import { EmailSchema } from "../components/Form/_validation";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useModal } from "../components/Modals/ModalUtils";
import { useQuery } from "react-query";

//http://localhost:3000/confirmEmail?token=e8bab441d021cb828b80b2c1a51937381c3b455b056a15ca28ab35fca53596d996e56b551c580749779654151aec35de5c5ac6225330abd9098068047ebf515a&tokenId=62479395d937dcecc6f5456b

export default function ConfirmEmail() {
    const { isReady, query, push } = useRouter();

    // this will try to login with anonymous
    const { confirmUser, resendConfirmationEmail, user, isAnon } = useMongo();
    const { openModal } = useModal("login/signup");

    const { isLoading, isIdle, isSuccess, isError, data, refetch } = useQuery(
        ["confirm-email", query],
        () => {
            if (!(query.token && query.tokenId)) throw Error("missing queries");
            return confirmUser(query.token, query.tokenId);
        },
        { refetchOnWindowFocus: false, enabled: isReady }
    );

    return (
        <>
            <Head>
                <title>Confirm Email - CardBox - Flashcard App</title>
                <meta name="description" content="CardBox - Flashcard App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main id="confirmEmail" className="column">
                {isIdle ||
                    (isLoading && (
                        <>
                            <div>
                                <Image
                                    width="360w"
                                    height="320w"
                                    objectFit="contain"
                                    layout="responsive"
                                    src="/assets/img/Registration_Loading.png"
                                    alt="cute cate -  registration complete"
                                />
                            </div>
                            <div className="message">
                                <div className="title-1">Loading</div>
                                <div className="subtitle-2">zzz...</div>
                            </div>
                            <Button
                                variant="primary"
                                className="action-btn"
                                disabled
                            >
                                Please Wait
                            </Button>
                        </>
                    ))}
                {isSuccess && (
                    <>
                        <div>
                            <Image
                                width="360w"
                                height="320w"
                                objectFit="contain"
                                layout="responsive"
                                src="/assets/img/Registration_Complete.png"
                                alt="cute cate -  registration complete"
                            />
                        </div>
                        <div className="message">
                            <div className="title-1">
                                Registration Complete!
                            </div>
                            <div className="subtitle-2">
                                You can now log in.
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            className="action-btn"
                            onClick={() => {
                                openModal("login");
                            }}
                        >
                            Log In
                        </Button>
                    </>
                )}
                {isError && (
                    <>
                        <div>
                            <Image
                                width="360w"
                                height="367w"
                                objectFit="contain"
                                layout="responsive"
                                src="/assets/img/oops.png"
                                alt="cute cate -  oops"
                            />
                        </div>
                        <div className="message">
                            <div className="title-1">
                                Something went wrong...
                            </div>
                            <div className="subtitle-2">
                                The link is broken or its been over 30 minutes.
                                You can resend the email confirmation link
                                below.
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                formBasicEmail: "",
                            }}
                            validationSchema={Yup.object({
                                formBasicEmail: EmailSchema,
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                // do stuff
                                resendConfirmationEmail(values.formBasicEmail)
                                    .then(() => {
                                        toast.success(
                                            "Email successfully sent!"
                                        );
                                    })
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
                            <MyForm>
                                <MyTextInput
                                    label="Email"
                                    type="email"
                                    placeholder="Enter email"
                                    controlId="formBasicEmail"
                                />
                                <MySubmitButton variant="primary">
                                    Resend Email
                                </MySubmitButton>
                            </MyForm>
                        </Formik>
                    </>
                )}
            </main>
        </>
    );
}
