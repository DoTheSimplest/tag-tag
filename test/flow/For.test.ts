import { describe, expect, it } from "vitest";
import { Div, For, ForMap, useState } from "../../src";

describe(ForMap, () => {
	it("conserve prev element", () => {
		const items = useState([1, 2, 3]);
		const element = Div([Div(["0"]), For(items, (item) => Div([`${item}`]))]);
		expect([...element.childNodes].map((c) => c.textContent)).toEqual([
			"0",
			"1",
			"2",
			"3",
		]);
	});
});
