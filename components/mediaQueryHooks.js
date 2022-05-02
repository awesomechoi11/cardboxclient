import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useIsomorphicLayoutEffect } from "framer-motion";

export function useIsMobile() {
    const [isClient, setIsClient] = useState(false);

    const isMobile = useMediaQuery({
        maxWidth: "800px",
    });

    useIsomorphicLayoutEffect(() => {
        if (typeof window !== "undefined") setIsClient(true);
    }, []);

    return isClient ? isMobile : false;
}
