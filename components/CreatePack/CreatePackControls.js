import Button from "@components/general/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    createPackCardsControlSelector,
    createPackManualSaveTrigger,
    createPackSaveState,
} from "./_CreatePackUtils";
import ago from "s-ago";
import { useEffect, useState } from "react";
import BackToTopButton from "./BackToTopButton";

// this one is fixed on top
export function CreatePackControlsTop() {
    const [cardIds, setCards] = useRecoilState(createPackCardsControlSelector);
    const saveState = useRecoilValue(createPackSaveState);
    const [count, setTrigger] = useRecoilState(createPackManualSaveTrigger);

    const [tick, setTick] = useState(0);
    useEffect(() => {
        const timeoutId = setTimeout(() => setTick(tick + 1), 1000 * 30);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [tick]);
    return (
        <div className="create-pack-controls py-[16px] px-0 flex items-center mb-[64rem] h-[40rem] top-0 sticky z-10 ">
            <div className="left absolute w-full pointer-events-none flex items-center gap-[16rem] ">
                <Button
                    size="sm"
                    onClick={() => setCards("swapAllCardTermDefinition")}
                >
                    swap
                </Button>
                <Button size="sm" onClick={() => setCards("shuffle")}>
                    shuffle
                </Button>
            </div>
            <div className="middle  absolute w-full pointer-events-none flex items-center gap-[16rem] ">
                <span className="subtitle-2">
                    {cardIds?.length || 0} Total Cards
                </span>
            </div>
            <div className="right  absolute w-full pointer-events-none flex items-center gap-[16rem] ">
                {saveState.saving ? (
                    <div className="text-blue-500 font-bold my-2 mx-0">
                        Saving...
                    </div>
                ) : (
                    saveState.lastUpdated && (
                        <div className="text-blue-500 font-bold my-2 mx-0">
                            Last Saved: {ago(saveState.lastUpdated)}
                        </div>
                    )
                )}

                <Button
                    size="sm"
                    onClick={() => {
                        setTrigger(count + 1);
                    }}
                    disabled={saveState.saving}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

export function CreatePackControlsBottom() {
    const [cardIds, setCards] = useRecoilState(createPackCardsControlSelector);
    const saveState = useRecoilValue(createPackSaveState);
    const [count, setTrigger] = useRecoilState(createPackManualSaveTrigger);
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const timeoutId = setTimeout(() => setTick(tick + 1), 1000 * 30);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [tick]);

    return (
        <div className="create-pack-controls bottom">
            <div className="left">
                <Button
                    size="sm"
                    onClick={() => setCards("swapAllCardTermDefinition")}
                >
                    swap
                </Button>
                <Button size="sm" onClick={() => setCards("shuffle")}>
                    shuffle
                </Button>
            </div>
            <div className="middle">
                <span className="subtitle-2">
                    {cardIds?.length || 0} Total Cards
                </span>
            </div>
            <div className="right">
                {saveState.saving ? (
                    <div className="text-blue-500 font-bold my-2 mx-0">
                        Saving...
                    </div>
                ) : (
                    saveState.lastUpdated && (
                        <div className="text-blue-500 font-bold my-2 mx-0">
                            Last Saved: {ago(saveState.lastUpdated)}
                        </div>
                    )
                )}

                <Button
                    size="sm"
                    onClick={() => {
                        setTrigger(count + 1);
                    }}
                    disabled={saveState.saving}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}
