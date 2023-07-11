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
import Button from "@components/general/Button";

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
    transition: {
      duration: 180,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

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
    dragOverlay || isDragging || isSorting
  );
  useEffect(() => {
    setDisplayState(dragOverlay || isDragging || isSorting);
  }, [dragOverlay, isDragging, isSorting]);
  return (
    // <InView>
    <div
      ref={ref}
      style={style}
      {...props}
      className={clsx(
        "create-pack-row-item w-[860px] mb-[64px] relative z-[2] focus:z-[3] ",
        isDragging && "dragging",
        dragOverlay && "overlay"
        // focused && "focused"
      )}
    >
      <div
        className={clsx(
          "break-words"
          // focused && "focused"
        )}
      >
        <div className="index title-1">{index + 1}</div>
        <Fields displayMode={displayState} />
      </div>
      <div className=" controls">
        <DragButton listeners={listeners} />
        <DeleteButton setData={setData} />
      </div>
    </div>
  );
});

function Fields({ displayMode }) {
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
      />
    </div>
  );
}

function Field({ image, label, id, defaultEditorState, displayMode }) {
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
            pxove Image
          </Button>
        }
        TriggerContent={
          <MyFilePickerCreatePackField
            initialValue={image}
            onUpdate={(file) => {
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
      <div className="flex flex-col flex-grow gap-2 editor-group">
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
//document.getElementById(`rdw-wrapper-${id}}`).focus()
