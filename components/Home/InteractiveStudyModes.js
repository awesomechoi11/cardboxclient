import ComingSoon from "./InteractiveStudyModes/ComingSoon";
import MatchPreview from "./InteractiveStudyModes/MatchPreview";

export default function InteractiveStudyModes({ play }) {
    return (
        <div id="interactive-study-modes-preview">
            <div className="cta">
                <div className="text-5xl font-bold color-blue-600">
                    Interactive Study Modes
                </div>
                <div className=" mt-2 mx-0 text-blue-400 break-words">
                    You can play games with every card pack and compete with
                    friends!
                </div>
            </div>
            <MatchPreview play={play} />
            <ComingSoon />
        </div>
    );
}
