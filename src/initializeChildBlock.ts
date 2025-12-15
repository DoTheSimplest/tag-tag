import { ControlFlow } from "./flow/ControlFlow";
import { applyStringOrState } from "./Modify";
import { State } from "./State";

export type ChildType = Node | string | State | ControlFlow;
export function initializeChildBlock(element: Element, children: ChildType[]) {
	for (const child of resolveTextNode(children)) {
		initializeChild(element, child);
	}
}

function initializeChild(element: Element, child: ControlFlow | Node) {
	if (child instanceof ControlFlow) {
		child.run(element);
	} else {
		element.appendChild(child);
	}
}

export function resolveTextNode(children: ChildType[]): (Node | ControlFlow)[] {
	return children.map((c) => {
		if (typeof c === "string" || c instanceof State) {
			const textNode = document.createTextNode("");
			applyStringOrState(c, (text) => {
				textNode.textContent = text;
			});
			return textNode;
		}
		return c;
	});
}
