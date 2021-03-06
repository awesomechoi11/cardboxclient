import InteractiveStudyModeNavbar from "../InteractiveStudyModeNavbar";
import SelectedCardPack from "../SelectedCardPack";
import MatchMenuScreen from "./MatchMenuScreen";
import { useRouter } from "next/router";

export default function MenuScreen() {
    const router = useRouter();

    if (!router.isReady) return null;
    const modePath = router.query.modePath;

    return (
        <div className="menu-screen">
            <div className="left">
                <div className=" title-1">Interactive Study Mode</div>
                <InteractiveStudyModeNavbar />
                {(() => {
                    switch (modePath) {
                        case "match": {
                            return <MatchMenuScreen />;
                        }
                        default:
                            return null;
                    }
                })()}
            </div>
            <div className="right">
                <div>
                    <div className="title-1">Selected Card Pack</div>
                    <SelectedCardPack />
                </div>
                <div>
                    <div className="title-1">Other Card Packs</div>
                    <div className="description-1">TODO</div>
                </div>
            </div>
        </div>
    );
}
