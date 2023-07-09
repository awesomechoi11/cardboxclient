import Button from "@components/general/Button";
import { useRouter } from "next/router";
import { MyHoverTooltip } from "../Tooltip/MyClickTooltip";
import JoinDiscordButton from "../Social/JoinDiscordButton";

export default function InteractiveStudyModeNavbar() {
    const studyModes = [
        {
            label: "Match",
            path: "match",
            enabled: true,
        },
        {
            label: "Flashcards",
            path: "flashcards",
        },
        {
            label: "Write",
            path: "write",
        },
        {
            label: "Quiz",
            path: "quiz",
        },
    ];
    const router = useRouter();

    if (!router.isReady) return null;

    return (
        <div className="nav">
            {studyModes.map((data) =>
                data.enabled ? (
                    <NavButton data={data} key={data.label} />
                ) : (
                    <NavButtonWithTooltip data={data} key={data.label} />
                )
            )}
        </div>
    );
}

function NavButtonWithTooltip({ data }) {
    return (
        <MyHoverTooltip
            tooltipOptions={{
                delayHide: 40,
                interactive: true,
                trigger: "hover",
                // visible: true,
                offset: [0, 14],
                mutationObserverOptions: {
                    attributes: false,
                    childList: true,
                    subtree: false,
                },
                placement: "bottom",
            }}
            TriggerContent={<NavButton data={data} />}
            TooltipContent={
                <div className="tooltip">
                    <div className="text-blue-500 font-bold my-2 mx-0">
                        Coming Soon!
                    </div>
                    <div className=" mt-2 mx-0 text-blue-400 break-words">
                        Keep Updated on Discord!
                    </div>
                    <div>
                        <JoinDiscordButton />
                    </div>
                </div>
            }
        />
    );
}

function NavButton({ data }) {
    const router = useRouter();
    return (
        <Button
            key={data.path}
            disabled={!data.enabled}
            variant="secondary"
            active={router.query.modePath === data.path}
            onClick={() =>
                router.push(
                    `/card-pack/${router.query.cardPackId}/${data.path}`
                )
            }
        >
            {data.label}
        </Button>
    );
}
