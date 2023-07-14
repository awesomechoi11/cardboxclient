import { useContext } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { CardPackContext } from "../../../../lib/[modePath]";
import { gameSettingsSelector } from "../../GameStateHelpers";
import Board from "./Boards";
import GameLogicFragment from "./GameLogicFragment";
import SideControls from "./SideControls";

export default function MatchRoundsGameScreen() {
    const { data, isSuccess, isError, isIdle, isLoading } =
        useContext(CardPackContext);
    const [gameSettings, setGameSettings] =
        useRecoilState(gameSettingsSelector);
    return (
        <div id="match-rounds-game-screen">
            <RecoilRoot>
                {isSuccess && data && (
                    <>
                        <SideControls
                            setGameSettings={setGameSettings}
                            gameSettings={gameSettings}
                        />
                        <Board />
                        <GameLogicFragment
                            setGameSettings={setGameSettings}
                            gameSettings={gameSettings}
                        />
                    </>
                )}
            </RecoilRoot>
        </div>
    );
}
