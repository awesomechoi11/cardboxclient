import { motion } from "framer-motion";
import React, { useState } from "react";

export function ActiveOnViewportEnter({ children }) {
    const [active, setActive] = useState(false);
    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                active,
            });
        });
    };
    return (
        <motion.div
            viewport={{ once: true }}
            onViewportEnter={() => {
                setActive(true);
            }}
        >
            {renderChildren()}
        </motion.div>
    );
}
