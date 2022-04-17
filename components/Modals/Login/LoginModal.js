import { useEffect, useState } from "react";
import { ModalWrapper, useModal } from "../ModalUtils";
import SignUpFlow from "./SignUpFlow";
import LogInFlow from "./LogInFlow";
import { useIsomorphicEffect } from "rooks";
import { useMongo } from "../../Mongo/MongoUtils";

export default function LoginModal() {
    const { data, setModalData } = useModal("login/signup");
    const { isAnon } = useMongo();
    return (
        <ModalWrapper modalId="login/signup" className="login-signup-modal">
            {isAnon ? (
                <>
                    {data === "login" && <LogInFlow setMode={setModalData} />}
                    {data === "signup" && <SignUpFlow setMode={setModalData} />}
                </>
            ) : (
                "You are already logged in!"
            )}
        </ModalWrapper>
    );
}
