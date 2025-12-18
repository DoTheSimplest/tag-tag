import { describe, it } from "vitest";
import {
	button,
	For,
	input,
	Modify,
	option,
	select,
	useState,
} from "../../src";

describe(select, () => {
	it("<option> simplest", () => {
		Modify(document.body, { html: "" }, [
			select([option(["Apple"]), option(["Orange"]), option(["Banana"])]),
		]);
	});

	it("<option> with For", () => {
		const items = useState(["Apple", "Orange", "Banana"]);
		const newValue = useState("Strawberry");
		const selectedValue = useState("Orange");

		function addItem() {
			items.set([...items.get(), newValue.get()]);
			selectedValue.set(newValue.get());
			newValue.set("");
		}
		function removeItem() {
			items.set(items.get().filter((item) => item !== selectedValue.get()));
			selectedValue.set("");
		}
		function updateSelectedValue(e: Event) {
			selectedValue.set((e.target as HTMLSelectElement).value);
		}
		function updateValue(e: Event) {
			const value = (e.target as HTMLInputElement).value;
			newValue.set(value);
		}

		Modify(document.body, { html: "" }, [
			select(
				[
					option({ prop: { value: "" } }, ["-- choose an item --"]),
					For(items, (item) => option([item])),
				],
				{
					prop: { value: selectedValue },
					on: { change: updateSelectedValue },
				},
			),
			input({
				attr: { value: newValue },
				on: { input: updateValue },
			}),
			button("+", { on: { click: addItem } }),
			button("✖", { on: { click: removeItem } }),
		]);
	});
});
