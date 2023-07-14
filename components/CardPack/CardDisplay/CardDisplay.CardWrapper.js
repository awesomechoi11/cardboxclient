import React from "react";
import { useCardDisplayCardState } from "./_CardDisplayUtils";

export default function CardDisplayCardWrapper({ index, active, children }) {
    const cardState = useCardDisplayCardState(index);
    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                active,
                cardState,
                data: cardState.cardData,
                index,
            });
        });
    };
    return <>{renderChildren()}</>;
}
