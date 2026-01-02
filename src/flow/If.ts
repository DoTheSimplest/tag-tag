import { type Signal, useComputed } from "../signal/Signal";
import type { ControlFlow } from "./ControlFlow";
import { Switch } from "./Switch";

export function If(
	condition: Signal<boolean>,
	show: () => Element,
	showElse?: () => Element,
): ControlFlow {
	return Switch(
		useComputed(() => `${condition.get()}`),
		{ true: show },
		showElse,
	);
}
