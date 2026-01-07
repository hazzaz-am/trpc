/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { TRPCRectProvider } from "@/trpc/client";
import { ReactNode, useEffect, useState } from "react";

interface ProviderProps {
	children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;
	return <TRPCRectProvider>{children}</TRPCRectProvider>;
}
