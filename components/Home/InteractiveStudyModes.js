import ComingSoon from "./InteractiveStudyModes/ComingSoon";
import MatchPreview from "./InteractiveStudyModes/MatchPreview";

export default function InteractiveStudyModes({ play }) {
    return (
        <div id="interactive-study-modes-preview">
            <div className="cta">
                <div className="jumbo-1">Interactive Study Modes</div>
                <div className="description-1">
                    You can play games with every card pack and compete with
                    friends!
                </div>
            </div>
            <MatchPreview play={play} />
            <ComingSoon />
        </div>
    );
}
