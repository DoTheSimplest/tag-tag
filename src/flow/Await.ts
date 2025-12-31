import { useState } from "../signal/Signal";
import { Switch } from "./Switch";

export function Await<T>(
	promise: Promise<T>,
	options?: {
		pending?: () => Element;
		fulfilled?: (value: T) => Element;
	},
) {
	const promiseState = useState("pending");

	let value: T;
	promise.then((v) => {
		value = v;
		promiseState.set("fulfilled");
	});

	const switchOptions = {
		pending: options?.pending,
	} as Record<string, () => Element>;

	if (options?.fulfilled) {
		switchOptions.fulfilled = () => options.fulfilled!(value);
	}

	for (const key in switchOptions) {
		if (!switchOptions[key]) delete switchOptions[key];
	}

	return Switch(promiseState, switchOptions);
}
