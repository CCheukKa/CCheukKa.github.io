import { createContext, useContext, RefObject } from "react";

type LayoutContextValue = {
    mainRef: RefObject<HTMLElement | null>;
    currentPageRefName: string;
    absoluteRefPath: string[];
};

const LayoutContext = createContext<LayoutContextValue>(null);

export function useLayout() {
    const ctx = useContext(LayoutContext);
    if (!ctx) throw new Error("useLayout must be used within LayoutContext.Provider");
    return ctx;
}

export default LayoutContext;