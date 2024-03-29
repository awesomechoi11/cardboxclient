import clsx from "clsx";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { atom, useRecoilState, useRecoilValue } from "recoil";
const focusedFieldState = atom({
    key: "focusedFieldState",
    default: null,
});

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then(({ Editor }) => Editor),
    {
        ssr: false,
    }
);
//   const draftToMarkdown = dynamic(() => import('draftjs-to-markdown'), { ssr: false });
export const CardEditor = ({ displayMode = false, ...props }) => {
    const rawHtml = useMemo(
        () =>
            draftToHtml(
                convertToRaw(props.defaultEditorState.getCurrentContent())
            ),
        [props.defaultEditorState]
    );

    const [focusedField, setFocusedField] = useRecoilState(focusedFieldState);

    if (displayMode || !(focusedField === props.wrapperId)) {
        return (
            <div
                className={clsx(
                    "card-editor-wrapper flex-grow ",
                    props.wrapperClassName
                )}
                tabIndex={"0"}
                onFocus={() => setFocusedField(props.wrapperId)}
            >
                <div
                    className={clsx(
                        props.editorClassName,
                        "px-4 py-3 min-h-[76px] border-[1px] border-blue-400 transition-colors rounded-sm cursor-pointer hover:border-blue-600"
                    )}
                    dangerouslySetInnerHTML={{
                        __html: rawHtml,
                    }}
                />
            </div>
        );
    }

    return <Inner {...props} />;
};

function Inner({
    editorClassName,
    wrapperClassName,
    toolbarClassName,
    defaultEditorState,
    onEditorStateChange,
    setActive,
    ...props
}) {
    const [editorState, setEditorState] = useState(
        defaultEditorState || EditorState.createEmpty()
    );
    const [focused, setFocused] = useState(false);
    const editorRef = useRef();
    const setEditorReference = (ref) => {
        editorRef.current = ref;
    };

    const [focusedField, setFocusedField] = useRecoilState(focusedFieldState);
    useEffect(() => {
        if (focusedField === props.wrapperId) {
            editorRef.current?.focus();
        }
    }, [focusedField, props.wrapperId]);

    return (
        <Editor
            editorRef={setEditorReference}
            stripPastedStyles
            // placeholder="Click Here!"
            toolbarOnFocus
            tabIndex="0"
            wrapperClassName={clsx(
                wrapperClassName,
                "card-editor-wrapper px-4 py-3 border-[1px] border-blue-400 rounded-sm",
                focused && "z-[2]"
            )}
            editorClassName={clsx(editorClassName, "")}
            toolbarClassName={clsx(toolbarClassName, "toolbar")}
            toolbar={toolbar}
            onFocus={() => {
                setFocused(true);
            }}
            onBlur={() => {
                setFocused(false);
            }}
            toolbarStyle={{
                visibility: "unset",
                opacity: focused ? 1 : 0,
                pointerEvents: focused ? "all" : "none",
                transform: `translate3d(0,${focused ? 0 : 10}px,0)`,
            }}
            {...props}
            editorState={editorState}
            onEditorStateChange={(newState) => {
                onEditorStateChange(newState);
                setEditorState(newState);
            }}
        />
    );
}

const toolbar = {
    options: ["inline", "list", "colorPicker", "history"],
    inline: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "superscript",
            "subscript",
        ],
        bold: {
            icon: "/assets/icons/li_bold.png",
            className: undefined,
        },
        italic: {
            icon: "/assets/icons/li_italic.png",
            className: undefined,
        },
        underline: {
            icon: "/assets/icons/li_underline.png",
            className: undefined,
        },
        strikethrough: {
            icon: "/assets/icons/li_strikethrough.png",
            className: undefined,
        },
        // monospace: { icon: monospace, className: undefined },
        superscript: {
            icon: "/assets/icons/li_superscript.png",
            className: undefined,
        },
        subscript: {
            icon: "/assets/icons/li_subscript.png",
            className: undefined,
        },
    },
    list: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: [
            "unordered",
            "ordered",
            //  "indent", "outdent"
        ],
        unordered: {
            icon: "/assets/icons/li_list.png",
            className: undefined,
        },
        ordered: {
            icon: "/assets/icons/li_list-ordered.png",
            className: undefined,
        },
        // indent: { icon: indent, className: undefined },
        // outdent: { icon: outdent, className: undefined },
    },

    colorPicker: {
        icon: "/assets/icons/li_highlighter.png",
        className: undefined,
        component: undefined,
        popupClassName: undefined,
        colors: [
            "rgb(97,189,109)",
            "rgb(26,188,156)",
            "rgb(84,172,210)",
            "rgb(44,130,201)",
            "rgb(147,101,184)",
            "rgb(71,85,119)",
            "rgb(204,204,204)",
            "rgb(65,168,95)",
            "rgb(0,168,133)",
            "rgb(61,142,185)",
            "rgb(41,105,176)",
            "rgb(85,57,130)",
            "rgb(40,50,78)",
            "rgb(0,0,0)",
            "rgb(247,218,100)",
            "rgb(251,160,38)",
            "rgb(235,107,86)",
            "rgb(226,80,65)",
            "rgb(163,143,132)",
            "rgb(239,239,239)",
            "rgb(255,255,255)",
            "rgb(250,197,28)",
            "rgb(243,121,52)",
            "rgb(209,72,65)",
            "rgb(184,49,47)",
            "rgb(124,112,107)",
            "rgb(209,213,216)",
        ],
    },

    history: {
        inDropdown: false,
        className: undefined,
        component: undefined,
        dropdownClassName: undefined,
        options: ["undo", "redo"],
        undo: {
            icon: "/assets/icons/li_undo.png",
            className: undefined,
        },
        redo: {
            icon: "/assets/icons/li_redo.png",
            className: undefined,
        },
    },
};
