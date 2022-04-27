import { useRecoilValue } from "recoil";
import { gameSettingsState } from "../GameStateHelpers";
import MatchPostGameDetails from "./MatchPostGameDetails";

export default function PostGameDetails() {
    const { gameScreenId } = useRecoilValue(gameSettingsState);

    switch (gameScreenId) {
        case "rounds": {
            return <MatchPostGameDetails />;
        }

        default: {
            return null;
        }
    }
}
