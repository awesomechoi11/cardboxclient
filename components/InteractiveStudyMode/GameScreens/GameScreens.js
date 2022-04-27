import { useRecoilValue } from "recoil";
import { gameSettingsState } from "../GameStateHelpers";
import MatchRoundsGameScreen from "./Match/RoundsGameScreen";

export default function GameScreens() {
    const { gameScreenId } = useRecoilValue(gameSettingsState);

    switch (gameScreenId) {
        case "rounds": {
            return <MatchRoundsGameScreen />;
        }

        default: {
            return null;
        }
    }
}
