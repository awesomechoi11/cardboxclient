import {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    createContext,
    useState,
} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { CardEditor } from "../Editor/CardEditor";
import { EditorState } from "draft-js";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    createPackSelectorFamily,
    useAtomFamilyWithContextId,
} from "./_CreatePackUtils";
import { MyFilePickerCreatePackField } from "../MyFilePicker";
import {
    DeleteButton,
    DragButton,
    SwapButton,
} from "./CreatePackRowItem.IconButtons";
import { MyHoverTooltip } from "../Tooltip/MyClickTooltip";
import { Button } from "react-bootstrap";

export const createPackIdContext = createContext();
createPackIdContext.displayName = "CreatePackIdContext";

export function DraggableCreatePackRowItem(props) {
    const {
        attributes,
        setNodeRef,
        transform,
        transition,
        listeners,
        isDragging,
        isSorting,
        // overIndex,
    } = useSortable({
        id: props.id,
    });

    if (!props.index) console.log("draggable item rendered");

    return (
        <createPackIdContext.Provider value={props.id}>
            <CreatePackRowItem
                ref={setNodeRef}
                // {...attributes}
                listeners={listeners}
                transform={transform}
                transition={transition}
                isSorting={isSorting}
                isDragging={isDragging}
                {...props}
            />
        </createPackIdContext.Provider>
    );
}

export const CreatePackRowItem = forwardRef(function CreatePackRowItem(
    {
        // data,
        fadeIn = false,
        isSorting,
        isDragging,
        dragOverlay = false,
        transform,
        transition,
        index,
        listeners,
        focused,
        ...props
    },
    ref
) {
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const setData = useAtomFamilyWithContextId(
        useSetRecoilState,
        createPackSelectorFamily,
        createPackIdContext
    );

    const [displayState, setDisplayState] = useState(
        dragOverlay || isDragging || isSorting || !focused
    );
    useEffect(() => {
        setDisplayState(dragOverlay || isDragging || isSorting || !focused);
    }, [dragOverlay, isDragging, isSorting, focused]);
    return (
        // <InView>
        <div
            ref={ref}
            style={style}
            {...props}
            className={clsx(
                "create-pack-row-item",
                isDragging && "dragging",
                dragOverlay && "overlay",
                focused && "focused"
            )}
        >
            <div className={clsx("content", focused && "focused")}>
                <div className="index title-1">{index + 1}</div>
                <Fields displayMode={displayState} onFocus={props.onFocus} />
            </div>
            <div className=" controls">
                <DragButton listeners={listeners} />
                <DeleteButton setData={setData} />
            </div>
        </div>
    );
});

function Fields({ displayMode, onFocus }) {
    const [data, setData] = useAtomFamilyWithContextId(
        useRecoilState,
        createPackSelectorFamily,
        createPackIdContext
    );
    const {
        term: { image: termImage, content: termContent, id: termId },
        definition: {
            image: definitionImage,
            content: definitionContent,
            id: definitionId,
        },
    } = data;

    const defaultEditorTerm = useMemo(
        () => EditorState.createWithContent(termContent),
        [termContent]
    );
    const defaultEditorDefinition = useMemo(
        () => EditorState.createWithContent(definitionContent),
        [definitionContent]
    );
    return (
        <div className="fields">
            <Field
                image={termImage}
                label="Term"
                id={termId}
                defaultEditorState={defaultEditorTerm}
                displayMode={displayMode}
                onFocus={onFocus}
            />
            <div className="middle">
                <SwapButton setData={setData} />
            </div>
            <Field
                image={definitionImage}
                label="Definition"
                id={definitionId}
                defaultEditorState={defaultEditorDefinition}
                displayMode={displayMode}
                onFocus={onFocus}
            />
        </div>
    );
}

function Field({ image, label, id, defaultEditorState, displayMode, onFocus }) {
    const setData = useAtomFamilyWithContextId(
        useSetRecoilState,
        createPackSelectorFamily,
        createPackIdContext
    );

    const onEditorStateChange = useCallback((editorState) => {
        setData({
            action: "updateItemEditorContent",
            data: {
                key: label.toLowerCase(),
                contentState: editorState.getCurrentContent(),
            },
        });
    }, []);
    return (
        <div className={clsx(label, "field")}>
            <MyHoverTooltip
                tooltipOptions={{
                    delayHide: 40,
                    interactive: true,
                    trigger: "hover",
                    visible: image?.value ? undefined : false,
                    offset: [0, 14],
                    mutationObserverOptions: {
                        attributes: false,
                        childList: true,
                        subtree: false,
                    },
                    placement: "bottom",
                }}
                TooltipContent={
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                            setData({
                                action: "updateItemImage",
                                data: {
                                    key: label.toLowerCase(),
                                    image: undefined,
                                },
                            });
                        }}
                    >
                        Remove Image
                    </Button>
                }
                TriggerContent={
                    <MyFilePickerCreatePackField
                        initialValue={image}
                        onUpdate={(file) => {
                            console.log(file);
                            setData({
                                action: "updateItemImage",
                                data: {
                                    key: label.toLowerCase(),
                                    image: file,
                                },
                            });
                        }}
                        className="image-wrapper"
                    />
                }
            />
            <div
                className="editor-group my-text-input"
                tabIndex="0"
                onFocus={onFocus}
                // onMouseMove={onFocus}
            >
                <label className="form-label">{label}</label>
                <CardEditor
                    displayMode={displayMode}
                    wrapperId={id}
                    key={id}
                    defaultEditorState={defaultEditorState}
                    onEditorStateChange={onEditorStateChange}
                />
            </div>
        </div>
    );
}
