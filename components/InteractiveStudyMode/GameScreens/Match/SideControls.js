import { useAnimationFrame, useIsomorphicLayoutEffect } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import TimerMachine from "react-timer-machine";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import LabeledPills from "../../../general/LabeledPills";
import { gameStateFamily } from "./utils";

export default function SideControls({ setGameSettings, gameSettings }) {
    const currentRound = useRecoilValue(gameStateFamily("currentRound"));
    const [playing, setPlaying] = useRecoilState(gameStateFamily("playing"));
    const setTime = useSetRecoilState(gameStateFamily("time"));
    const resumeTimestamp = useRef(null);
    const totalRunningTime = useRef(0);
    const timeSinceMount = useRef(0);
    const displayTime = useRef(0);
    const playingRef = useRef(playing);
    playingRef.current = playing;
    useAnimationFrame((time) => {
        timeSinceMount.current = time;
        if (!playingRef.current) return;
        if (resumeTimestamp.current === null) {
            resumeTimestamp.current = time;
        }
        if (resumeTimestamp.current !== null) {
            displayTime.current =
                totalRunningTime.current +
                (timeSinceMount.current - resumeTimestamp.current);
            setTime(displayTime.current);
        }
    });

    return (
        <div className="side-controls">
            <div>
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
                <LabeledPills label="Category" content={gameSettings.label} />
                <LabeledPills
                    label="Time Elapsed"
                    content={
                        <TimerMachine // dont use this to keep track but update at intervals
                            timeStart={0}
                            started={true}
                            formatTimer={() =>
                                Math.round(displayTime.current / 10) / 100
                            }
                            paused={!playing}
                            interval={100} // tick every 0.1 seconds
                        />
                    }
                />
                <LabeledPills label="Current Round" content={currentRound} />
            </div>

            <div>
                {playing ? (
                    <>
                        {/* <Button variant="primary" size="sm">
                        Restart
                    </Button> */}
                        <Button
                            variant="secondary"
                            // size="sm"
                            onClick={() => {
                                setPlaying(false);
                                playingRef.current = false;
                                totalRunningTime.current +=
                                    timeSinceMount.current -
                                    resumeTimestamp.current;
                                resumeTimestamp.current = null;
                            }}
                        >
                            Pause
                        </Button>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
