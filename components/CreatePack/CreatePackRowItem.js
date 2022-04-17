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
import MyIconButton from "../Form/MyIconButton";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    createPackSelectorFamily,
    useAtomFamilyWithContextId,
} from "./_CreatePackUtils";
import { MyFilePickerCreatePackField } from "../MyFilePicker";

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
                {...attributes}
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
                dragOverlay && "overlay"
            )}
        >
            <div className={clsx("content", focused && "focused")}>
                <div className="index title-1">{index + 1}</div>
                <Fields displayMode={displayState} />
            </div>
            <div className=" controls">
                <MyIconButton {...listeners} variant="secondary">
                    {hand_svg}
                </MyIconButton>
                <MyIconButton
                    onClick={() => {
                        setData({
                            action: "remove",
                        });
                    }}
                    variant="secondary"
                >
                    {trash_svg}
                </MyIconButton>
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
                <MyIconButton
                    //  onClick={swapItem}
                    onClick={() =>
                        setData({
                            action: "swapCardTermDefinition",
                        })
                    }
                >
                    {swap_svg}
                </MyIconButton>
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
    // useSetRecoilState(createPackSelectorFamily())

    const onEditorStateChange = useCallback((editorState) => {
        // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
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

            <div className="editor-group my-text-input">
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

const swap_svg = (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.2929 2.29289C16.6834 1.90237 17.3166 1.90237 17.7071 2.29289L21.7071 6.29289C22.0976 6.68342 22.0976 7.31658 21.7071 7.70711L17.7071 11.7071C17.3166 12.0976 16.6834 12.0976 16.2929 11.7071C15.9024 11.3166 15.9024 10.6834 16.2929 10.2929L19.5858 7L16.2929 3.70711C15.9024 3.31658 15.9024 2.68342 16.2929 2.29289Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 7C8 6.44772 8.44772 6 9 6H21C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H9C8.44772 8 8 7.55228 8 7Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.70711 12.2929C8.09763 12.6834 8.09763 13.3166 7.70711 13.7071L4.41421 17L7.70711 20.2929C8.09763 20.6834 8.09763 21.3166 7.70711 21.7071C7.31658 22.0976 6.68342 22.0976 6.29289 21.7071L2.29289 17.7071C1.90237 17.3166 1.90237 16.6834 2.29289 16.2929L6.29289 12.2929C6.68342 11.9024 7.31658 11.9024 7.70711 12.2929Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 17C2 16.4477 2.44772 16 3 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H3C2.44772 18 2 17.5523 2 17Z"
            fill="#674433"
        />
    </svg>
);

const hand_svg = (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.582 9.34761C18.0428 8.88681 18.6678 8.62793 19.3195 8.62793C19.9711 8.62793 20.5961 8.88681 21.0569 9.34761C21.5177 9.80842 21.7766 10.4334 21.7766 11.0851V15.1803C21.7766 15.6327 21.4099 15.9994 20.9576 15.9994C20.5052 15.9994 20.1385 15.6327 20.1385 15.1803V11.0851C20.1385 10.8679 20.0522 10.6595 19.8986 10.5059C19.745 10.3523 19.5367 10.266 19.3195 10.266C19.1022 10.266 18.8939 10.3523 18.7403 10.5059C18.5867 10.6595 18.5004 10.8679 18.5004 11.0851H16.8623C16.8623 10.4334 17.1212 9.80842 17.582 9.34761Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.3059 7.70992C14.7667 7.24911 15.3917 6.99023 16.0433 6.99023C16.695 6.99023 17.32 7.24911 17.7808 7.70992C18.2416 8.17072 18.5005 8.79571 18.5005 9.44739V14.3617C18.5005 14.814 18.1338 15.1807 17.6814 15.1807C17.2291 15.1807 16.8624 14.814 16.8624 14.3617V9.44739C16.8624 9.23016 16.7761 9.02183 16.6225 8.86823C16.4689 8.71463 16.2606 8.62833 16.0433 8.62833C15.8261 8.62833 15.6178 8.71463 15.4642 8.86823C15.3106 9.02183 15.2243 9.23016 15.2243 9.44739V11.0855C15.2243 11.5378 14.8576 11.9045 14.4052 11.9045C13.9529 11.9045 13.5862 11.5378 13.5862 11.0855V9.44739C13.5862 8.79571 13.8451 8.17072 14.3059 7.70992Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.0297 9.34761C11.4905 8.88681 12.1155 8.62793 12.7672 8.62793C13.4189 8.62793 14.0439 8.88681 14.5047 9.34761C14.9655 9.80842 15.2244 10.4334 15.2244 11.0851V14.7708C15.2244 15.2232 14.8577 15.5899 14.4053 15.5899C13.953 15.5899 13.5863 15.2232 13.5863 14.7708V11.0851C13.5863 10.8679 13.5 10.6595 13.3464 10.5059C13.1928 10.3523 12.9844 10.266 12.7672 10.266C12.55 10.266 12.3417 10.3523 12.1881 10.5059C12.0345 10.6595 11.9482 10.8679 11.9482 11.0851V17.6375C11.9482 18.0898 11.5815 18.4565 11.1291 18.4565C10.6768 18.4565 10.3101 18.0898 10.3101 17.6375V11.0851C10.3101 10.4334 10.5689 9.80842 11.0297 9.34761Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.5957 11.9047C22.3785 11.9047 22.1701 11.991 22.0165 12.1446C21.8629 12.2982 21.7766 12.5065 21.7766 12.7238C21.7766 13.1761 21.4099 13.5428 20.9576 13.5428C20.5052 13.5428 20.1385 13.1761 20.1385 12.7238C20.1385 12.0721 20.3974 11.4471 20.8582 10.9863C21.319 10.5255 21.944 10.2666 22.5957 10.2666C23.2474 10.2666 23.8724 10.5255 24.3332 10.9863C24.794 11.4471 25.0528 12.0721 25.0528 12.7238V17.6381C25.0528 19.5931 24.2762 21.468 22.8938 22.8505C21.5114 24.2329 19.6364 25.0095 17.6814 25.0095H16.0433C13.5298 25.0095 11.931 24.2168 10.56 22.855L10.558 22.853L7.60944 19.9045C7.5996 19.8946 7.59001 19.8845 7.58068 19.8742C7.15798 19.406 6.93149 18.7933 6.94812 18.1627C6.96475 17.5322 7.22323 16.9322 7.67003 16.487C8.11683 16.0417 8.71773 15.7854 9.34832 15.771C9.97892 15.7566 10.5909 15.9852 11.0576 16.4096C11.0671 16.4183 11.0765 16.4273 11.0857 16.4364L12.5272 17.8779C12.8471 18.1978 12.8471 18.7164 12.5272 19.0363C12.2073 19.3561 11.6887 19.3561 11.3689 19.0363L9.94345 17.6108C9.78948 17.4762 9.59055 17.404 9.38572 17.4087C9.17552 17.4135 8.97522 17.4989 8.82629 17.6473C8.67735 17.7957 8.5912 17.9957 8.58565 18.2059C8.58026 18.4103 8.65152 18.6091 8.78505 18.7634L11.7144 21.6928C11.7147 21.6931 11.715 21.6934 11.7153 21.6937C12.7848 22.7557 13.9707 23.3714 16.0433 23.3714H17.6814C19.202 23.3714 20.6603 22.7674 21.7355 21.6921C22.8107 20.6169 23.4147 19.1586 23.4147 17.6381V12.7238C23.4147 12.5065 23.3284 12.2982 23.1748 12.1446C23.0212 11.991 22.8129 11.9047 22.5957 11.9047Z"
            fill="#674433"
        />
    </svg>
);
const trash_svg = (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.7 7C12.8716 7 12.2 7.67157 12.2 8.5V10H11H9C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12V22C9 23.6569 10.3431 25 12 25H20C21.6569 25 23 23.6569 23 22V12C23.5523 12 24 11.5523 24 11C24 10.4477 23.5523 10 23 10H19.8V8.5C19.8 7.67157 19.1284 7 18.3 7H13.7ZM21 12H18.3H13.7H11V22C11 22.5523 11.4477 23 12 23H20C20.5523 23 21 22.5523 21 22V12ZM17.8 10H14.2V9H17.8V10ZM14 15C14.5523 15 15 15.4477 15 16V19C15 19.5523 14.5523 20 14 20C13.4477 20 13 19.5523 13 19V16C13 15.4477 13.4477 15 14 15ZM19 16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16V19C17 19.5523 17.4477 20 18 20C18.5523 20 19 19.5523 19 19V16Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.7 7C12.8716 7 12.2 7.67157 12.2 8.5V10H11H9C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12V22C9 23.6569 10.3431 25 12 25H20C21.6569 25 23 23.6569 23 22V12C23.5523 12 24 11.5523 24 11C24 10.4477 23.5523 10 23 10H19.8V8.5C19.8 7.67157 19.1284 7 18.3 7H13.7ZM21 12H18.3H13.7H11V22C11 22.5523 11.4477 23 12 23H20C20.5523 23 21 22.5523 21 22V12ZM17.8 10H14.2V9H17.8V10ZM14 15C14.5523 15 15 15.4477 15 16V19C15 19.5523 14.5523 20 14 20C13.4477 20 13 19.5523 13 19V16C13 15.4477 13.4477 15 14 15ZM19 16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16V19C17 19.5523 17.4477 20 18 20C18.5523 20 19 19.5523 19 19V16Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.7 7C12.8716 7 12.2 7.67157 12.2 8.5V10H11H9C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12V22C9 23.6569 10.3431 25 12 25H20C21.6569 25 23 23.6569 23 22V12C23.5523 12 24 11.5523 24 11C24 10.4477 23.5523 10 23 10H19.8V8.5C19.8 7.67157 19.1284 7 18.3 7H13.7ZM21 12H18.3H13.7H11V22C11 22.5523 11.4477 23 12 23H20C20.5523 23 21 22.5523 21 22V12ZM17.8 10H14.2V9H17.8V10ZM14 15C14.5523 15 15 15.4477 15 16V19C15 19.5523 14.5523 20 14 20C13.4477 20 13 19.5523 13 19V16C13 15.4477 13.4477 15 14 15ZM19 16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16V19C17 19.5523 17.4477 20 18 20C18.5523 20 19 19.5523 19 19V16Z"
            fill="#674433"
        />
    </svg>
);
