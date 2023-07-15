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
        <div className="create-pack-controls py-[16px] px-0 flex items-center mb-[64px] top-0 sticky z-10 ">
            <div className="left justify-start absolute w-full pointer-events-none flex items-center gap-[16px] ">
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
            <div className="middle justify-center absolute w-full pointer-events-none flex items-center gap-[16px] ">
                <span className="mx-2 my-0 font-bold text-blue-600">
                    {cardIds?.length || 0} Total Cards
                </span>
            </div>
            <div className="right justify-end absolute w-full pointer-events-none flex items-center gap-[16px] ">
                {saveState.saving ? (
                    <div className="mx-0 my-2 font-bold text-blue-500">
                        Saving...
                    </div>
                ) : (
                    saveState.lastUpdated && (
                        <div className="mx-0 my-2 font-bold text-blue-500">
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
        <div className="flex relative create-pack-controls py-[16px] px-0 items-center mb-[64px] top-0 z-10  bottom">
            <div className="left justify-start absolute w-full pointer-events-none flex items-center gap-[16px]">
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
            <div className="absolute justify-center w-full pointer-events-none flex items-center gap-[16px]">
                <span className="mx-2 my-0 font-bold text-blue-600">
                    {cardIds?.length || 0} Total Cards
                </span>
            </div>
            <div className="absolute justify-end w-full pointer-events-none flex items-center gap-[16px]">
                {saveState.saving ? (
                    <div className="mx-0 my-2 font-bold text-blue-500">
                        Saving...
                    </div>
                ) : (
                    saveState.lastUpdated && (
                        <div className="mx-0 my-2 font-bold text-blue-500">
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
