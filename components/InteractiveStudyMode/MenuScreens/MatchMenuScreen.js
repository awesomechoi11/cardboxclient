import { useEffect, useState } from "react";
import Button from "@components/general/Button";
import Select from "react-select";
import { useSetRecoilState } from "recoil";
import { gameSettingsSelector } from "../GameStateHelpers";

const options = [
    {
        value: { gameScreenId: "rounds", value: 1, stage: "game-screen" },
        label: "1 Round",
    },
    {
        value: { gameScreenId: "rounds", value: 3, stage: "game-screen" },
        label: "3 Rounds",
    },
    {
        value: { gameScreenId: "rounds", value: 5, stage: "game-screen" },
        label: "5 Rounds",
    },
    // {
    //     value: {
    //         gameScreenId: "rounds",
    //         value: Infinity,
    //         stage: "game-screen",
    //     },
    //     label: "Endless Rounds",
    // },

    // { value: { type: "timelimit", value: 15 }, label: "Time Limit - 15" },
    // { value: { type: "timelimit", value: 30 }, label: "Time Limit - 30" },
    // { value: { type: "timelimit", value: 45 }, label: "Time Limit - 45" },
    // { value: { type: "cleartotal", value: 15 }, label: "Clear Total - 15" },
    // { value: { type: "cleartotal", value: 30 }, label: "Clear Total - 30" },
    // { value: { type: "cleartotal", value: 45 }, label: "Clear Total - 45" },
];

export default function MatchDetails() {
    const [selectedCategory, setSelectedCategory] = useState(options[0]);

    const setGameSettings = useSetRecoilState(gameSettingsSelector);
    useEffect(() => {
        setGameSettings({
            action: "set",
            data: {
                category: selectedCategory.value,
                label: selectedCategory.label,
                gameScreenId: selectedCategory.value.gameScreenId,
            },
        });
    }, [selectedCategory, setGameSettings]);

    return (
        <>
            <div className="category">
                <div className="text-blue-600 font-bold mx-2 my-0">
                    Category
                </div>
                <Select
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: "var(--color-secondary-1)",
                            borderColor: "var(--color-secondary-3)",
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: "var(--color-secondary-1)",
                        }),
                        option: (provided, state) => {
                            return {
                                ...provided,
                                color: "var(--color-primary-1)",
                                backgroundColor: state.isSelected
                                    ? "var(--color-secondary-2)"
                                    : "var(--color-secondary-1)",
                                "&:hover": {
                                    backgroundColor: "var(--color-secondary-3)",
                                },
                            };
                        },
                    }}
                    options={options}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                />
            </div>
            <div className="instructions">
                <div className="text-blue-600 font-bold mx-2 my-0">
                    Instructions
                </div>
                <div className="break-words">
                    <b>Match</b> - Select two cards that have matching term and
                    definition
                    {selectedCategory.value.gameScreenId === "rounds" && (
                        <>
                            <br /> <br />
                            <b>Rounds</b> - Clear card pairs!
                        </>
                    )}
                    {selectedCategory.value.gameScreenId === "cleartotal" && (
                        <>
                            <br /> <br />
                            <b>Clear Total</b> - Try to clear{" "}
                            <b>{selectedCategory.value.value}</b> card pairs as
                            fast as possible with little mistakes as possible!
                        </>
                    )}
                    {selectedCategory.value.gameScreenId ===
                        "endlessRounds" && (
                        <>
                            <b>Endless Rounds</b> - Clear card pairs starting
                            with <b>3 lives</b>. Gain a life after getting{" "}
                            <b>12 in a row correct</b>!
                        </>
                    )}
                </div>
            </div>
            <Button
                onClick={() =>
                    setGameSettings({
                        action: "set",
                        data: {
                            stage: selectedCategory.value.stage,
                        },
                    })
                }
            >
                Continue
            </Button>
        </>
    );
}
