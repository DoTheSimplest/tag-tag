import { describe, expect, it } from "vitest";
import { Div } from "../../src";
import { findData } from "../../src/data/data";

describe(findData, () => {
	it("find data from ancestors", () => {
		const child = Div();
		Div({ data: { theme: "dark" } }, [child]);
		expect(findData(child, "theme")).toBe("dark");
	});

	it("returns undefined if ancestors don't have data", () => {
		const child = Div();
		Div({ data: { theme: "dark" } }, [child]);
		expect(findData(child, "invalid-key")).toBeUndefined();
	});
});
