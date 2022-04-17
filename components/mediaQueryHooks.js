import { useState, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";

export function useIsMobile() {
    const [isClient, setIsClient] = useState(false);

    const isMobile = useMediaQuery({
        maxWidth: "800px",
    });

    //   const isTablet = useMediaQuery({
    //     minWidth: breakpointMobile,
    //     maxWidth: breakpointTablet,
    //   });

    //   const isDesktop = useMediaQuery({
    //     minWidth: breakpointTablet,
    //   });

    useLayoutEffect(() => {
        if (typeof window !== "undefined") setIsClient(true);
    }, []);

    return isClient ? isMobile : false;
    //   return {
    //     isDesktop: isClient ? isDesktop : true,
    //     isTablet: isClient ? isTablet : false,
    //     isMobile: isClient ? isMobile : false,
    //   };
}
