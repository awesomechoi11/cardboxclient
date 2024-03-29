import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Realm from "realm-web";
import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";
import { useDidMount } from "rooks";

const NEXT_PUBLIC_APP_ID = process.env.NEXT_PUBLIC_APP_ID,
    NEXT_PUBLIC_CLUSTER_NAME = process.env.NEXT_PUBLIC_CLUSTER_NAME,
    NEXT_PUBLIC_DATABASE_NAME = process.env.NEXT_PUBLIC_DATABASE_NAME;
const app = new Realm.App({ id: NEXT_PUBLIC_APP_ID });
export const MongoApp = app;

const mongoState = atom({
    key: "mongoState",
    default: {
        user: null,
        db: null,
        isAnon: null,
        isReady: false,
    },
});

export const mongoSelector = selector({
    key: "mongoSelector",
    get: ({ get }) => get(mongoState),
    set: ({ set, get }, { action, data }) => {
        switch (action) {
            case "setUser": {
                const newVal = {
                    ...get(mongoState),
                    client: data.user.mongoClient("mongodb-atlas"),
                    db: data.user
                        .mongoClient("mongodb-atlas")
                        .db(NEXT_PUBLIC_DATABASE_NAME),
                    isReady: true,
                    isAnon: data.user.providerType === "anon-user",
                };
                set(mongoState, newVal);
                break;
            }
        }
    },
});

export function WaitForMongo({ children }) {
    const [mongo, setMongo] = useRecoilState(mongoSelector);
    if (!mongo.isReady) return null;
    return children;
}

export function MongoRoot({ children }) {
    const [mongo, setMongo] = useRecoilState(mongoSelector);
    useEffect(() => {
        // populate mongo atom
        // default login as anon user if no user
        let user = app.currentUser;
        if (user) {
            setMongo({ action: "setUser", data: { user } });
        } else {
            app.logIn(Realm.Credentials.anonymous()).then((user) =>
                setMongo({ action: "setUser", data: { user } })
            );
        }
    }, []);

    // if (!mongo.isReady) return null;

    return children;
}

export function useMongo() {
    const [{ db, isReady, isAnon, client }, setMongo] =
        useRecoilState(mongoSelector);

    async function loginEmailPassword(email, password) {
        // Create an anonymous credential
        const credentials = Realm.Credentials.emailPassword(email, password);
        const user = await app.logIn(credentials);
        setMongo({ action: "setUser", data: { user } });
        return user;
    }
    async function registerEmailPassword(email, password) {
        return await app.emailPasswordAuth.registerUser({ email, password });
    }
    async function resendConfirmationEmail(email) {
        return await app.emailPasswordAuth.resendConfirmationEmail({ email });
    }
    async function confirmUser(token, tokenId) {
        return await app.emailPasswordAuth.confirmUser({ token, tokenId });
    }
    async function logOut() {
        await app.currentUser.logOut();
        setMongo({ action: "setUser", data: { user: app.currentUser } });
    }

    return {
        isAnon,
        app,
        user: app.currentUser,
        client,
        db,
        logOut,
        isReady,
        loginEmailPassword,
        registerEmailPassword,
        resendConfirmationEmail,
        confirmUser,
    };
}

//    //https://www.mongodb.com/community/forums/t/how-could-i-know-all-about-error-codes/110634/8

export function toastifyMongoErrors(err) {
    if (err instanceof Realm.MongoDBRealmError) {
        const { error, statusCode } = err;
        const errorType = error || statusCode;
        let toastMessage = "";
        switch (errorType) {
            case "invalid username":
            case "invalid username/password":
            case "invalid password":
            case 401:
                toastMessage = "Uh Oh! Email or Password is invalid";
                break;
            case 404:
            case "user not found":
                toastMessage = "Uh Oh! User not found";
                break;
            case "confirmation required":
            case "name already in use":
            case 409:
                // Email is already registered
                toastMessage = "Email is already registered";
                break;
            case "password must be between 6 and 128 characters":
            case 400:
                // Invalid password - must be between 6 and 128 characters
                break;
            default:
                // In theory you won't ever hit this default, but if an error message/code without a case ever comes up it will fall back to this.
                toastMessage =
                    "Uh Oh! Something went wrong. Please refresh and try again...";
                break;
        }

        toast.error(toastMessage);
    }
}
