import Button from "@components/general/Button";
import { Form, Formik } from "formik";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { MySubmitButton, MyTextInput } from "../components/Form/Basic";
import { EmailSchema } from "../components/Form/_validation";
import { useModal } from "../components/Modals/ModalUtils";
import {
  toastifyMongoErrors,
  useMongo,
  WaitForMongo,
} from "../components/Mongo/MongoUtils";
import Navbar from "../components/Navbar";
import PlaceholderColumn from "../components/PlaceholderColumn";
//http://localhost:3000/confirmEmail?token=e8bab441d021cb828b80b2c1a51937381c3b455b056a15ca28ab35fca53596d996e56b551c580749779654151aec35de5c5ac6225330abd9098068047ebf515a&tokenId=62479395d937dcecc6f5456b

export default function ConfirmEmail() {
  return (
    <>
      <Head>
        <title key="title">Confirm Email - Flippy - Flashcard App</title>
      </Head>
      <Navbar />
      <WaitForMongo>
        <Main />
      </WaitForMongo>
    </>
  );
}

function Main() {
  const { isReady, query, push } = useRouter();

  // this will try to login with anonymous
  const { confirmUser, resendConfirmationEmail, user, isAnon, logOut } =
    useMongo();
  const { openModal } = useModal("login/signup");

  const { isLoading, isIdle, isSuccess, isError, data, refetch } = useQuery(
    ["confirm-email", query, isAnon],
    () => {
      if (!(query.token && query.tokenId)) throw Error("missing queries");
      return confirmUser(query.token, query.tokenId);
    },
    {
      refetchOnWindowFocus: false,
      enabled: isReady && !!query.token && !!query.tokenId && isAnon,
    }
  );
  const [NewSignup, setNewSignup] = useState(false);
  useEffect(() => {
    if (isSuccess && !NewSignup) setNewSignup(false);
  }, [isSuccess]);

  return (
    <main id="confirmEmail" className="column">
      {isIdle &&
        isReady &&
        (isAnon ? (
          <PlaceholderColumn
            options={{
              imageKey: "oopsCat",
              message: {
                title: "Something went wrong...",
                description: "The link seems to be broken",
              },
            }}
          />
        ) : NewSignup ? (
          <PlaceholderColumn
            options={{
              imageKey: "catOnBook",
              message: {
                title: "You can now create packs!",
                description: "Meow. Thank you for signing up!",
              },
              actionComponent: (
                <>
                  <Button
                    onClick={() => {
                      push("/card-pack-editor");
                    }}
                  >
                    Create A Card Pack
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      push("/browse");
                    }}
                  >
                    Browse Card Packs
                  </Button>
                </>
              ),
            }}
          />
        ) : (
          <PlaceholderColumn
            options={{
              imageKey: "catOnBook",
              message: {
                title: "You are already signed in!",
                description: "Please sign out to confirm a new account email",
              },
              action: {
                label: "Log Out",
                props: {
                  onClick: () => {
                    logOut();
                  },
                },
              },
            }}
          />
        ))}
      {isLoading && (
        <>
          <div>
            <Image
              width="360"
              height="320"
              className="object-contain"
              src="/assets/img/Registration_Loading.png"
              alt="cute cate -  registration complete"
            />
          </div>
          <div className="message">
            <div className="title-1 text-lg font-semibold text-blue-600 my-1">
              Loading
            </div>
            <div className="text-blue-600 font-bold mx-2 my-0">zzz...</div>
          </div>
          <Button variant="primary" className="action-btn" disabled>
            Please Wait
          </Button>
        </>
      )}
      {isSuccess &&
        (isAnon ? (
          <>
            <div>
              <Image
                width="360"
                height="320"
                className="object-contain"
                src="/assets/img/Registration_Complete.png"
                alt="cute cate -  registration complete"
              />
            </div>
            <div className="message">
              <div className="title-1 text-lg font-semibold text-blue-600 my-1">
                Registration Complete!
              </div>
              <div className="text-blue-600 font-bold mx-2 my-0">
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
        ) : (
          <PlaceholderColumn
            options={{
              imageKey: "catOnBook",
              message: {
                title: "You can now create packs!",
                description: "Meow",
              },
              action: {
                label: "Browse Card Packs",
                props: {
                  onClick: () => {
                    push("/browse");
                  },
                },
              },
            }}
          />
        ))}
      {isError && (
        <>
          <div>
            <Image
              width="360"
              height="367"
              className="object-contain"
              src="/assets/img/oops.png"
              alt="cute cate -  oops"
            />
          </div>
          <div className="message">
            <div className="title-1 text-lg font-semibold text-blue-600 my-1">
              Something went wrong...
            </div>
            <div className="text-blue-600 font-bold mx-2 my-0">
              The link is broken or its been over 30 minutes. You can resend the
              email confirmation link below.
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
                  toast.success("Email successfully sent!");
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
            <Form>
              <MyTextInput
                label="Email"
                type="email"
                placeholder="Enter email"
                controlId="formBasicEmail"
              />
              <MySubmitButton variant="primary">Resend Email</MySubmitButton>
            </Form>
          </Formik>
        </>
      )}
    </main>
  );
}
