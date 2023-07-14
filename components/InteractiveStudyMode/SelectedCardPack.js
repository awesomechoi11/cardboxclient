import { AnimatePresence, motion } from "framer-motion";
import millify from "millify";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import Button from "@components/general/Button";
import { CardPackContext } from "../../lib/[modePath]";
import PlaceholderColumn from "../PlaceholderColumn";
import { normalizeImageSrc } from "@components/general/NormalizedImage";

const previewAnim = {
    initial: {
        scale: 0.98,
        opacity: 0,
        top: 0,
        position: "absolute",
        width: "100%",
    },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        top: 0,
        position: "relative",
        width: "100%",
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        top: 0,
        position: "absolute",
        width: "100%",
    },
};

export default function SelectedCardPack() {
    const router = useRouter();
    const { data, isSuccess, isError, isIdle, isLoading } =
        useContext(CardPackContext);

    return (
        <div className="selected-card-pack">
            <AnimatePresence>
                {isIdle && (
                    <motion.div key="idle" className="inner" {...previewAnim}>
                        <div className="flex justify-center placeholder-wrapper">
                            <PlaceholderColumn
                                options={{
                                    imageKey: "studyCat",
                                    message: {
                                        title: "Choose a pack to study",
                                        description:
                                            "or click below to make your own",
                                    },
                                    action: {
                                        label: "Create A Card Pack",
                                        props: {
                                            onClick: () => {
                                                router.push("/editor");
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </motion.div>
                )}
                {isLoading && (
                    <motion.div
                        key="loading"
                        className="inner"
                        {...previewAnim}
                    >
                        <div className="flex justify-center placeholder-wrapper">
                            <PlaceholderColumn presetKey="loading" />
                        </div>
                    </motion.div>
                )}
                {isError && (
                    <motion.div key="error" className="inner" {...previewAnim}>
                        <div className="flex justify-center placeholder-wrapper">
                            <PlaceholderColumn presetKey="error" />
                        </div>
                    </motion.div>
                )}
                {isSuccess && data && <Preview data={data} />}
                {isSuccess && !data && (
                    <motion.div key="error" className="inner" {...previewAnim}>
                        <div className="flex justify-center placeholder-wrapper">
                            <PlaceholderColumn presetKey="error" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Preview({ data }) {
    const {
        title,
        likes = 0,
        shares = 0,
        duplicates = 0,
        views = 0,
        image,
    } = data;
    const router = useRouter();
    let imgSrc = normalizeImageSrc(image);
    return (
        <div className="inner">
            <div className="header">
                {imgSrc && (
                    <div className="img">
                        <Image
                            alt="selected card pack"
                            src={imgSrc}
                            width="64"
                            height="54"
                            className="object-cover"
                        />
                    </div>
                )}
                <div className="text-blue-600 font-bold mx-2 my-0">{title}</div>
            </div>
            <div className="mx-0 mt-2 break-words stats text-blue-400 ">
                <div className="stat">
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
                            d="M22.6324 11.5234C21.6815 9.82375 19.4086 9.51288 18.0535 10.8971L16.7016 12.2779C16.5155 12.468 16.2631 12.5748 15.9999 12.5748C15.7367 12.5748 15.4844 12.468 15.2983 12.2779L13.9464 10.8971C12.5912 9.51293 10.3184 9.82384 9.36757 11.5235C8.73174 12.66 8.89976 14.0878 9.78115 15.0381L15.9999 21.7429L22.2188 15.0382C23.1003 14.0878 23.2683 12.66 22.6324 11.5234ZM16.6502 9.46375C18.9306 7.13448 22.7553 7.6576 24.3554 10.5177C25.4255 12.4303 25.1428 14.8331 23.6595 16.4322L17.0804 23.5253C16.4933 24.1582 15.5065 24.1582 14.9194 23.5253L8.34045 16.4321C6.85726 14.833 6.57453 12.4304 7.64448 10.5178C9.24453 7.65771 13.0692 7.13452 15.3497 9.4638L15.9999 10.1279L16.6502 9.46375Z"
                            className="fill-blue-600"
                        />
                    </svg>

                    {millify(likes)}
                </div>
                <div className="stat">
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
                            d="M21.317 9.13012C20.2843 8.19133 18.7048 8.19967 17.6821 9.14931L10.4346 15.8791C8.55009 17.629 8.54297 20.6094 10.4191 22.3683C12.1359 23.9777 14.8105 23.9672 16.5145 22.3443L23.2939 15.8878C23.6938 15.5069 24.3268 15.5223 24.7077 15.9222C25.0886 16.3222 25.0731 16.9551 24.6732 17.336L17.8938 23.7926C15.4218 26.1469 11.5417 26.1622 9.05124 23.8273C6.32951 21.2757 6.33983 16.9521 9.07371 14.4135L16.3212 7.68373C18.1053 6.02706 20.8608 6.01251 22.6623 7.65024C24.7046 9.50686 24.7081 12.7175 22.6698 14.5786L15.4126 21.2047C14.3158 22.2062 12.6252 22.1678 11.575 21.1175C10.4652 20.0078 10.4944 18.1998 11.6393 17.1264L18.2996 10.8824C18.7025 10.5046 19.3354 10.525 19.7131 10.928C20.0908 11.3309 20.0704 11.9637 19.6675 12.3414L13.0072 18.5854C12.6865 18.8861 12.6784 19.3925 12.9892 19.7033C13.2833 19.9975 13.7568 20.0082 14.0641 19.7277L21.3213 13.1016C22.4897 12.0348 22.4877 10.1944 21.317 9.13012Z"
                            className="fill-blue-600"
                        />
                    </svg>

                    {millify(shares)}
                </div>
                <div className="stat">
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
                            d="M15 14C14.4477 14 14 14.4477 14 15V24C14 24.5523 14.4477 25 15 25H24C24.5523 25 25 24.5523 25 24V15C25 14.4477 24.5523 14 24 14H15ZM12 15C12 13.3431 13.3431 12 15 12H24C25.6569 12 27 13.3431 27 15V24C27 25.6569 25.6569 27 24 27H15C13.3431 27 12 25.6569 12 24V15Z"
                            fill="#9E694F"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15 14C14.4477 14 14 14.4477 14 15V24C14 24.5523 14.4477 25 15 25H24C24.5523 25 25 24.5523 25 24V15C25 14.4477 24.5523 14 24 14H15ZM12 15C12 13.3431 13.3431 12 15 12H24C25.6569 12 27 13.3431 27 15V24C27 25.6569 25.6569 27 24 27H15C13.3431 27 12 25.6569 12 24V15Z"
                            fill="black"
                            fillOpacity="0.35"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 7C7.73478 7 7.48043 7.10536 7.29289 7.29289C7.10536 7.48043 7 7.73478 7 8V17C7 17.2652 7.10536 17.5196 7.29289 17.7071C7.48043 17.8946 7.73478 18 8 18H9C9.55228 18 10 18.4477 10 19C10 19.5523 9.55228 20 9 20H8C7.20435 20 6.44129 19.6839 5.87868 19.1213C5.31607 18.5587 5 17.7956 5 17V8C5 7.20435 5.31607 6.44129 5.87868 5.87868C6.44129 5.31607 7.20435 5 8 5H17C17.7956 5 18.5587 5.31607 19.1213 5.87868C19.6839 6.44129 20 7.20435 20 8V9C20 9.55228 19.5523 10 19 10C18.4477 10 18 9.55228 18 9V8C18 7.73478 17.8946 7.48043 17.7071 7.29289C17.5196 7.10536 17.2652 7 17 7H8Z"
                            fill="#9E694F"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 7C7.73478 7 7.48043 7.10536 7.29289 7.29289C7.10536 7.48043 7 7.73478 7 8V17C7 17.2652 7.10536 17.5196 7.29289 17.7071C7.48043 17.8946 7.73478 18 8 18H9C9.55228 18 10 18.4477 10 19C10 19.5523 9.55228 20 9 20H8C7.20435 20 6.44129 19.6839 5.87868 19.1213C5.31607 18.5587 5 17.7956 5 17V8C5 7.20435 5.31607 6.44129 5.87868 5.87868C6.44129 5.31607 7.20435 5 8 5H17C17.7956 5 18.5587 5.31607 19.1213 5.87868C19.6839 6.44129 20 7.20435 20 8V9C20 9.55228 19.5523 10 19 10C18.4477 10 18 9.55228 18 9V8C18 7.73478 17.8946 7.48043 17.7071 7.29289C17.5196 7.10536 17.2652 7 17 7H8Z"
                            fill="black"
                            fillOpacity="0.35"
                        />
                    </svg>

                    {millify(duplicates)}
                </div>
                <div className="stat">
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
                            d="M24.0291 15.7758C24.0292 15.7758 24.0284 15.7783 24.0264 15.7836C24.028 15.7785 24.029 15.7758 24.0291 15.7758ZM23.4332 15.387C23.6536 15.6364 23.8078 15.8427 23.908 16C23.8078 16.1573 23.6536 16.3636 23.4332 16.613C22.8899 17.2276 22.0863 17.9449 21.1409 18.633C20.1997 19.3181 19.1765 19.9318 18.219 20.3661C17.2246 20.8172 16.4642 21 16 21C15.5358 21 14.7754 20.8172 13.781 20.3661C12.8235 19.9318 11.8003 19.3181 10.8591 18.633C9.91373 17.9449 9.11011 17.2276 8.56679 16.613C8.3464 16.3636 8.19217 16.1573 8.09204 16C8.19217 15.8427 8.3464 15.6364 8.56679 15.387C9.11011 14.7724 9.91373 14.0551 10.8591 13.367C11.8003 12.6819 12.8235 12.0682 13.781 11.6339C14.7754 11.1828 15.5358 11 16 11C16.4642 11 17.2246 11.1828 18.219 11.6339C19.1765 12.0682 20.1997 12.6819 21.1409 13.367C22.0863 14.0551 22.8899 14.7724 23.4332 15.387ZM7.97088 15.7758C7.971 15.7758 7.97203 15.7784 7.97364 15.7836C7.97158 15.7783 7.97077 15.7758 7.97088 15.7758ZM7.97088 16.2242C7.97077 16.2242 7.97158 16.2217 7.97364 16.2164C7.97203 16.2216 7.971 16.2242 7.97088 16.2242ZM24.0286 16.2225C24.0282 16.2212 24.0275 16.2192 24.0264 16.2164C24.0273 16.2194 24.028 16.2215 24.0285 16.2228C24.0289 16.2237 24.0291 16.2242 24.0291 16.2242C24.0292 16.2242 24.029 16.2237 24.0286 16.2225ZM26 16C26 18 19.5145 23 16 23C12.4855 23 6 18 6 16C6 14 12.4855 9 16 9C19.5145 9 26 14 26 16ZM18 16C18 17.1046 17.1046 18 16 18C14.8954 18 14 17.1046 14 16C14 14.8954 14.8954 14 16 14C17.1046 14 18 14.8954 18 16ZM20 16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16Z"
                            fill="#9E694F"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M24.0291 15.7758C24.0292 15.7758 24.0284 15.7783 24.0264 15.7836C24.028 15.7785 24.029 15.7758 24.0291 15.7758ZM23.4332 15.387C23.6536 15.6364 23.8078 15.8427 23.908 16C23.8078 16.1573 23.6536 16.3636 23.4332 16.613C22.8899 17.2276 22.0863 17.9449 21.1409 18.633C20.1997 19.3181 19.1765 19.9318 18.219 20.3661C17.2246 20.8172 16.4642 21 16 21C15.5358 21 14.7754 20.8172 13.781 20.3661C12.8235 19.9318 11.8003 19.3181 10.8591 18.633C9.91373 17.9449 9.11011 17.2276 8.56679 16.613C8.3464 16.3636 8.19217 16.1573 8.09204 16C8.19217 15.8427 8.3464 15.6364 8.56679 15.387C9.11011 14.7724 9.91373 14.0551 10.8591 13.367C11.8003 12.6819 12.8235 12.0682 13.781 11.6339C14.7754 11.1828 15.5358 11 16 11C16.4642 11 17.2246 11.1828 18.219 11.6339C19.1765 12.0682 20.1997 12.6819 21.1409 13.367C22.0863 14.0551 22.8899 14.7724 23.4332 15.387ZM7.97088 15.7758C7.971 15.7758 7.97203 15.7784 7.97364 15.7836C7.97158 15.7783 7.97077 15.7758 7.97088 15.7758ZM7.97088 16.2242C7.97077 16.2242 7.97158 16.2217 7.97364 16.2164C7.97203 16.2216 7.971 16.2242 7.97088 16.2242ZM24.0286 16.2225C24.0282 16.2212 24.0275 16.2192 24.0264 16.2164C24.0273 16.2194 24.028 16.2215 24.0285 16.2228C24.0289 16.2237 24.0291 16.2242 24.0291 16.2242C24.0292 16.2242 24.029 16.2237 24.0286 16.2225ZM26 16C26 18 19.5145 23 16 23C12.4855 23 6 18 6 16C6 14 12.4855 9 16 9C19.5145 9 26 14 26 16ZM18 16C18 17.1046 17.1046 18 16 18C14.8954 18 14 17.1046 14 16C14 14.8954 14.8954 14 16 14C17.1046 14 18 14.8954 18 16ZM20 16C20 18.2091 18.2091 20 16 20C13.7909 20 12 18.2091 12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16Z"
                            fill="black"
                            fillOpacity="0.35"
                        />
                    </svg>

                    {millify(views)}
                </div>
            </div>
            <div className="actions">
                <Button variant="secondary" size="sm">
                    Preview Cards
                </Button>
                <Button variant="secondary" size="sm">
                    View Leaderboards
                </Button>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                        router.push(`/card-pack/${router.query.cardPackId}`);
                    }}
                >
                    Goto Pack
                </Button>
            </div>
        </div>
    );
}
