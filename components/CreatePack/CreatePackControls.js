import { Button } from "react-bootstrap";
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
        <div className="create-pack-controls top">
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
                    <div className="subtitle-1">Saving...</div>
                ) : (
                    saveState.lastUpdated && (
                        <div className="subtitle-1">
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
                    <div className="subtitle-1">Saving...</div>
                ) : (
                    saveState.lastUpdated && (
                        <div className="subtitle-1">
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
