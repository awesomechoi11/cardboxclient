import {
    closestCenter,
    DndContext,
    DragOverlay,
    MeasuringStrategy,
} from "@dnd-kit/core";
import {
    restrictToFirstScrollableAncestor,
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import {
    atom,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
import AddBetweenTrigger from "./AddBetweenTrigger";
import CreatePackCardsAutosave from "./CreatePackCardsAutoSave";
import {
    CreatePackControlsBottom,
    CreatePackControlsTop,
} from "./CreatePackControls";
import {
    createPackIdContext,
    CreatePackRowItem,
    DraggableCreatePackRowItem,
} from "./CreatePackRowItem";
import {
    createPackCardIdsState,
    createPackSelectorFamily,
} from "./_CreatePackUtils";

export default function CreatePackRow() {
    const cardIds = useRecoilValue(createPackCardIdsState);
    const setData = useSetRecoilState(createPackSelectorFamily("root"));

    const [activeId, setActiveId] = useState(null);
    const activeIndex = useMemo(
        () => cardIds.findIndex((cardId) => cardId === activeId),
        [cardIds, activeId]
    );
    function handleDragStart(e) {
        setActiveId(e.active.id);
    }
    function handleDragEnd(e) {
        setActiveId(null);

        setData({
            action: "reorder",
            data: {
                active: e.active.id,
                over: e.over.id,
            },
        });
    }
    return (
        <div className="row">
            <CreatePackCardsAutosave />
            <CreatePackControlsTop />
            <DndContext
                collisionDetection={closestCenter}
                measuring={{
                    droppable: { strategy: MeasuringStrategy.Always },
                }}
                modifiers={[
                    restrictToFirstScrollableAncestor,
                    restrictToVerticalAxis,
                    restrictToWindowEdges,
                ]}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={cardIds}
                    strategy={verticalListSortingStrategy}
                >
                    {cardIds.map((cardId, index) => (
                        <Fragment key={cardId + "trigger"}>
                            <AddBetweenTrigger index={index} />
                            <DraggableCreatePackRowItem
                                id={cardId}
                                index={index}
                            />
                        </Fragment>
                    ))}
                </SortableContext>
                <DragOverlay
                    dropAnimation={{
                        duration: 220,
                        easing: "cubic-bezier(0.2, 0, 0.33, 1)",
                    }}
                >
                    {activeIndex !== null ? (
                        <createPackIdContext.Provider value={activeId}>
                            <CreatePackRowItem
                                id={activeId}
                                index={activeIndex}
                                dragOverlay
                            />
                        </createPackIdContext.Provider>
                    ) : null}
                </DragOverlay>
            </DndContext>
            <Button
                variant="secondary"
                className="add-btn"
                onClick={() => {
                    setData({
                        action: "add",
                    });
                    setTimeout(() => {
                        [...document.querySelectorAll(".card-editor-wrapper")]
                            .at(-2)
                            .focus();
                        document
                            .getElementById("app")
                            .scrollTo(
                                0,
                                document.getElementById("app").scrollHeight
                            );
                    }, 100);
                }}
            >
                Add A Card
            </Button>
            <CreatePackControlsBottom />
        </div>
    );
}
