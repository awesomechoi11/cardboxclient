import Button from "@components/general/Button";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Realm from "realm-web";
import * as Yup from "yup";
import { MySubmitButton, MyTextInput } from "../../Form/Basic";
import { EmailSchema, PasswordSchema } from "../../Form/_validation";
import { toastifyMongoErrors, useMongo } from "../../Mongo/MongoUtils";

export default function SignUpFlow({ setMode }) {
  const [stage, setStage] = useState("one");
  const data = useRef();
  return (
    <div className="signup-flow">
      {stage === "one" && (
        <StageOne setStage={setStage} data={data} setMode={setMode} />
      )}
      {stage === "two" && <StageTwo data={data} />}
      {stage === "three" && (
        <StageThree data={data} setStage={setStage} setMode={setMode} />
      )}
    </div>
  );
}

function StageOne({ setStage, data, setMode }) {
  const { registerEmailPassword } = useMongo();
  return (
    <>
      <div className="title-1 text-lg font-semibold text-blue-600 my-1 mb-4">
        Sign Up
      </div>
      <div className=" mt-2 mx-0 text-blue-400 break-words  mb-6">
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
          data.current = values.formBasicEmail;
          // do stuff
          registerEmailPassword(values.formBasicEmail, values.formBasicPassword)
            .then(() => {
              setStage("two");
            })
            .catch((err) => {
              console.log(err);
              //    //https://www.mongodb.com/community/forums/t/how-could-i-know-all-about-error-codes/110634/8

              if (err instanceof Realm.MongoDBRealmError) {
                const { error, statusCode } = err;
                const errorType = error || statusCode;
                switch (errorType) {
                  case "name already in use":
                  case 409:
                    // Email is already registered
                    setStage("three");
                    break;
                }
                toastifyMongoErrors(err);
              } else {
                console.log(err);
                toast.error(
                  "Uh Oh! Unable to register. Please refresh and try again..."
                );
              }
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        <Form className="text-left mb-10 mt-6">
          <MyTextInput
            label="Email"
            type="email"
            placeholder="Enter email"
            controlId="formBasicEmail"
            className="mb-2"
          />
          <MyTextInput
            label="Password"
            type="password"
            placeholder="Enter password"
            controlId="formBasicPassword"
            className="mb-2"
          />
          <MySubmitButton variant="primary" className="w-full mt-4">
            Sign Up
          </MySubmitButton>
        </Form>
      </Formik>
      <div
        className="text-blue-500 font-bold my-2 mx-0 switch cursor-pointer"
        onClick={() => {
          setMode("login");
        }}
      >
        Already have an account? Log In
      </div>
    </>
  );
}

function StageTwo({ data }) {
  const { resendConfirmationEmail } = useMongo();
  const [locked, setLocked] = useState(false);
  return (
    <>
      <div className="img">
        <Image
          width="360"
          height="364"
          className="object-contain"
          src="/assets/img/Email Verification_Success.png"
          alt="cute cate - email sent"
        />
      </div>
      <div className="message">
        <div className="title-1 text-lg font-semibold text-blue-600 my-1">
          Almost Done!
        </div>
        <div className="text-blue-600 font-bold mx-2 my-0">
          Check your email for a verification link!
        </div>
      </div>
      <Button
        disabled={locked}
        variant="primary"
        className="action-btn"
        onClick={() => {
          setLocked(true);
          resendConfirmationEmail(data.current)
            .catch((e) => {
              toastifyMongoErrors(e);
              console.log(e);
            })
            .finally(() => {
              setTimeout(() => {
                setLocked(false);
              }, 5000);
            });
        }}
      >
        {locked ? "Mail Sent" : "Resend Email"}
      </Button>
    </>
  );
}

function StageThree({ data, setStage, setMode }) {
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
        <div className="title-1 text-lg font-semibold text-blue-600 my-1">
          You seem familiar...
        </div>
        <div className="text-blue-600 font-bold mx-2 my-0">
          You already registered! But did you confirm your email? If you did,
          you can go back and log in!
        </div>
      </div>
      <Button onClick={() => setMode("login")}>Goto Login</Button>
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
            .then(() => {
              setStage("two");
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
  );
}

const facebook_svg = (
  <svg
    style={{
      width: "48",
      height: "48",
    }}
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z"
      fill="#1877F2"
    />
    <path
      d="M33.3422 30.9375L34.4062 24H27.75V19.5C27.75 17.602 28.68 15.75 31.6613 15.75H34.6875V9.84375C34.6875 9.84375 31.9411 9.375 29.3152 9.375C23.8331 9.375 20.25 12.6975 20.25 18.7125V24H14.1562V30.9375H20.25V47.7084C22.7349 48.0972 25.2651 48.0972 27.75 47.7084V30.9375H33.3422Z"
      fill="white"
    />
  </svg>
);
const google_svg = (
  <svg
    style={{
      width: "48",
      height: "48",
    }}
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_227_700)">
      <path
        d="M47.532 24.553C47.532 22.9215 47.3997 21.2813 47.1175 19.6763H24.48V28.9182H37.4434C36.9055 31.8989 35.177 34.5357 32.6461 36.2113V42.208H40.3801C44.9217 38.0279 47.532 31.8548 47.532 24.553Z"
        fill="#4285F4"
      />
      <path
        d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
        fill="#34A853"
      />
      <path
        d="M11.0051 28.6004C9.99973 25.6197 9.99973 22.3921 11.0051 19.4114V13.2295H3.03298C-0.371021 20.011 -0.371021 28.0008 3.03298 34.7823L11.0051 28.6004Z"
        fill="#FBBC04"
      />
      <path
        d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
        fill="#EA4335"
      />
    </g>
    <defs>
      <clipPath id="clip0_227_700">
        <rect width="48" height="48" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const apple_svg = (
  <svg
    style={{
      width: "48",
      height: "48",
    }}
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_227_702)">
      <path
        d="M43.5839 37.4071C42.858 39.0841 41.9988 40.6277 41.0033 42.0469C39.6463 43.9817 38.5352 45.3209 37.6789 46.0646C36.3516 47.2853 34.9294 47.9105 33.4065 47.946C32.3132 47.946 30.9947 47.6349 29.4599 47.0038C27.9201 46.3757 26.5051 46.0646 25.2112 46.0646C23.8542 46.0646 22.3988 46.3757 20.8421 47.0038C19.2831 47.6349 18.0271 47.9638 17.0668 47.9964C15.6064 48.0586 14.1508 47.4157 12.6978 46.0646C11.7704 45.2557 10.6105 43.8691 9.22087 41.9047C7.72995 39.807 6.50422 37.3745 5.54395 34.6012C4.51554 31.6058 4 28.7051 4 25.8969C4 22.6801 4.69509 19.9057 6.08734 17.5807C7.18153 15.7132 8.63718 14.2401 10.4591 13.1586C12.2809 12.0772 14.2495 11.5261 16.3694 11.4908C17.5293 11.4908 19.0505 11.8496 20.9408 12.5548C22.8258 13.2623 24.0361 13.6211 24.5667 13.6211C24.9635 13.6211 26.308 13.2016 28.5874 12.3652C30.7428 11.5895 32.562 11.2683 34.0524 11.3948C38.0908 11.7207 41.1247 13.3127 43.1425 16.1807C39.5307 18.3691 37.7441 21.4342 37.7797 25.3662C37.8123 28.429 38.9233 30.9776 41.107 33.0013C42.0966 33.9405 43.2017 34.6664 44.4313 35.182C44.1646 35.9553 43.8832 36.696 43.5839 37.4071ZM34.322 0.960762C34.322 3.36131 33.445 5.6027 31.6969 7.6773C29.5873 10.1436 27.0357 11.5687 24.2687 11.3439C24.2334 11.0559 24.213 10.7528 24.213 10.4343C24.213 8.12973 25.2162 5.66343 26.9978 3.6469C27.8872 2.6259 29.0185 1.77694 30.3903 1.09972C31.7591 0.432598 33.0539 0.0636663 34.2716 0.000488281C34.3072 0.321404 34.322 0.64234 34.322 0.960731V0.960762Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_227_702">
        <rect width="48" height="48" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
