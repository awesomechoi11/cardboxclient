import { motion } from "framer-motion";
import { customAlphabet } from "nanoid";
import { useRef } from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { alphaNumId } from "../utils";
import { createPackSelectorFamily } from "./_CreatePackUtils";

const addBetweenState = atom({
    key: "addBetweenState",
    default: null,
});

export default function AddBetweenTrigger({ index }) {
    const idRef = useRef(alphaNumId());
    const [current, setCurrent] = useRecoilState(addBetweenState);
    const setData = useSetRecoilState(createPackSelectorFamily("root"));
    return (
        <div className="add-between-trigger">
            <div
                className="inner"
                onMouseEnter={() => {
                    setCurrent(idRef.current);
                }}
            ></div>
            {current === idRef.current && (
                <motion.div
                    layoutId="add-between"
                    layoutDependency={1}
                    className="button"
                    onClick={() => {
                        // add item at index
                        setData({ action: "add", data: { index } });
                    }}
                    transition={{
                        duration: 0.2,
                        ease: [0.2, 0, 0.33, 1],
                    }}
                >
                    <svg
                        style={{
                            width: "8",
                            height: "32",
                        }}
                        width="8"
                        height="32"
                        viewBox="0 0 8 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M-6.99382e-07 16C-5.24537e-07 20 8 24 8 32L8 -3.49691e-07C8 8 -8.74228e-07 12 -6.99382e-07 16Z"
                            fill="#DECBC0"
                            className="background"
                        />
                    </svg>

                    <div className="right background">
                        <svg
                            style={{
                                width: "32",
                                height: "32",
                            }}
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.0001 8.51472C15.0001 7.96243 15.4478 7.51472 16.0001 7.51472C16.5524 7.51472 17.0001 7.96243 17.0001 8.51472L17.0001 15H23.4854C24.0376 15 24.4854 15.4477 24.4854 16C24.4854 16.5523 24.0376 17 23.4854 17H17.0001L17.0001 23.4853C17.0001 24.0376 16.5524 24.4853 16.0001 24.4853C15.4478 24.4853 15.0001 24.0376 15.0001 23.4853L15.0001 17L8.5148 17C7.96252 17 7.5148 16.5523 7.5148 16C7.5148 15.4477 7.96252 15 8.5148 15L15.0001 15L15.0001 8.51472Z"
                                fill="#674433"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.0001 8.51472C15.0001 7.96243 15.4478 7.51472 16.0001 7.51472C16.5524 7.51472 17.0001 7.96243 17.0001 8.51472L17.0001 15H23.4854C24.0376 15 24.4854 15.4477 24.4854 16C24.4854 16.5523 24.0376 17 23.4854 17H17.0001L17.0001 23.4853C17.0001 24.0376 16.5524 24.4853 16.0001 24.4853C15.4478 24.4853 15.0001 24.0376 15.0001 23.4853L15.0001 17L8.5148 17C7.96252 17 7.5148 16.5523 7.5148 16C7.5148 15.4477 7.96252 15 8.5148 15L15.0001 15L15.0001 8.51472Z"
                                fill="#674433"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.0001 8.51472C15.0001 7.96243 15.4478 7.51472 16.0001 7.51472C16.5524 7.51472 17.0001 7.96243 17.0001 8.51472L17.0001 15H23.4854C24.0376 15 24.4854 15.4477 24.4854 16C24.4854 16.5523 24.0376 17 23.4854 17H17.0001L17.0001 23.4853C17.0001 24.0376 16.5524 24.4853 16.0001 24.4853C15.4478 24.4853 15.0001 24.0376 15.0001 23.4853L15.0001 17L8.5148 17C7.96252 17 7.5148 16.5523 7.5148 16C7.5148 15.4477 7.96252 15 8.5148 15L15.0001 15L15.0001 8.51472Z"
                                fill="#674433"
                            />
                        </svg>
                        <div className="subtitle-2">Add Between</div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
