import * as Yup from "yup";

export const PasswordSchema = Yup.string()
    .required("Please enter your password")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "password"
    );

export const EmailSchema = Yup.string()
    .email("Invalid email address")
    .max(254, "Must be 254 characters or less")
    .required("Please enter your email");
