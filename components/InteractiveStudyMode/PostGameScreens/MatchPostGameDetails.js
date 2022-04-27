import { Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import LabeledPills from "../../general/LabeledPills";
import { gameSettingsSelector } from "../GameStateHelpers";
import { useRouter } from "next/router";

export default function MatchPostGameDetails() {
    const [gameSettings, setGameSettings] =
        useRecoilState(gameSettingsSelector);
    console.log(gameSettings);
    const { gameId, category, time, label } = gameSettings;
    const router = useRouter();
    return (
        <div id="match-post-game-screen">
            <div className="top">
                <div className="details">
                    <div className="title-1">Interactive Study Mode</div>
                    <div className="stats">
                        <LabeledPills label="Mode" content="Match" />
                        <LabeledPills label="Category" content={label} />
                    </div>
                    <div className="time">
                        <div className="subtitle-2">My Time</div>
                        <div className="content">
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
                                    `/card-pack/${router.query.cardPackId}`
                                );
                            }}
                        >
                            Goto Pack
                        </Button>
                    </div>
                </div>
                <div className="leaderboard">
                    <div className="subtitle-2">Leaderboard</div>
                    <div className="description-1">coming soon!</div>
                </div>
            </div>
        </div>
    );
}
