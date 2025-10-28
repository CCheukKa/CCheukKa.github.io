import { createContext, useContext, RefObject } from "react";

type LayoutContextValue = {
    mainRef: RefObject<HTMLElement | null>;
};

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function useLayout() {
    const ctx = useContext(LayoutContext);
    if (!ctx) throw new Error("useLayout must be used within LayoutContext.Provider");
    return ctx;
}

export default LayoutContext;