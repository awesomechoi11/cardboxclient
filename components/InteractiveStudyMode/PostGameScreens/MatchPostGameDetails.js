import Button from "@components/general/Button";
import { useRecoilState } from "recoil";
import LabeledPills from "../../general/LabeledPills";
import { gameSettingsSelector } from "../GameStateHelpers";
import { useRouter } from "next/router";

export default function MatchPostGameDetails() {
    const [gameSettings, setGameSettings] =
        useRecoilState(gameSettingsSelector);
    const { gameId, category, time, label } = gameSettings;
    const router = useRouter();
    return (
        <div id="match-post-game-screen">
            <div className="top">
                <div className="details">
                    <div className="title-1 text-lg font-semibold text-blue-600 my-1">
                        Interactive Study Mode
                    </div>
                    <div className="stats">
                        <LabeledPills label="Mode" content="Match" />
                        <LabeledPills label="Category" content={label} />
                    </div>
                    <div className="time">
                        <div className="text-blue-600 font-bold mx-2 my-0">
                            My Time
                        </div>
                        <div className="break-words">
                            {Math.round(time / 10) / 100} s
                        </div>
                    </div>
                    <div className="buttons">
                        <Button
                            size="sm"
                            onClick={() => {
                                setGameSettings({
                                    action: "set",
                                    data: {
                                        stage: "game-screen",
                                    },
                                });
                            }}
                        >
                            Play Again
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                                setGameSettings({
                                    action: "set",
                                    data: {
                                        stage: "menu-screen",
                                    },
                                });
                            }}
                        >
                            Back To Menu
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                                router.push(
                                    `/cardpack/${router.query.cardPackId}`
                                );
                            }}
                        >
                            Goto Pack
                        </Button>
                    </div>
                </div>
                <div className="leaderboard">
                    <div className="text-blue-600 font-bold mx-2 my-0">
                        Leaderboard
                    </div>
                    <div className=" mt-2 mx-0 text-blue-400 break-words">
                        coming soon!
                    </div>
                </div>
            </div>
        </div>
    );
}
