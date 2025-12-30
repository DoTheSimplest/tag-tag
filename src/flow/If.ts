import { nodeData } from "../data/data";
import { getNextNodeSibling } from "../initializeChildBlock";
import { type Signal, useEffect } from "../signal/Signal";
import { ControlFlow } from "./ControlFlow";

export function If(
	condition: Signal<boolean>,
	show: () => Element,
	showElse?: () => Element,
): ControlFlow {
	return new IfFlow(condition, show, showElse);
}
export class IfFlow extends ControlFlow {
	#condition: Signal<boolean>;
	#createThen: () => Element;
	#createElse?: () => Element;

	constructor(
		condition: Signal<boolean>,
		create: () => Element,
		createElse?: () => Element,
	) {
		super();
		this.#condition = condition;
		this.#createThen = create;
		this.#createElse = createElse;
	}

	run(element: Element) {
		let child: Element;
		let elseChild: Element | undefined;

		const update = () => {
			const next = getNextNodeSibling(this);

			if (this.#condition.get()) {
				if (!child) child = this.#createThen();

				// data
				nodeData.resolveCallbacks(element, child);
				// insert `child`
				this.firstNode = child;
				elseChild?.remove();
				element.insertBefore(child, next);
			} else {
				if (!elseChild) elseChild = this.#createElse?.();

				// data
				elseChild && nodeData.resolveCallbacks(element, elseChild);
				// insert `elseChild`
				this.firstNode = elseChild ?? null;
				child?.remove();
				elseChild && element.insertBefore(elseChild, next);
			}
		};

		useEffect(update);
	}
}
