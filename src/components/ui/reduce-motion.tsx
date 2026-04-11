import { domAnimation, LazyMotion } from 'motion/react';

import type { PropsWithChildren } from 'react';

export function ReduceMotion({ children }: PropsWithChildren) {
	return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}