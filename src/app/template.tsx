"use client";

import { RevealFx } from "@once-ui-system/core";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <RevealFx translateY="8" speed="medium" fillWidth style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {children}
        </RevealFx>
    );
}
