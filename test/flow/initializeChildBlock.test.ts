import { assert, describe, expect, it } from "vitest";
import { useState } from "../../src";
import { resolveTextNode } from "../../src/initializeChildBlock";

describe(resolveTextNode, () => {
	it("string to Text", () => {
		const input = ["Hello"];
		const actual = resolveTextNode(input);
		assert(actual[0] instanceof Text);
		expect(actual[0].textContent).toBe("Hello");
	});
	it("State<string> to Text", () => {
		const input = [useState("Hello")];
		const actual = resolveTextNode(input);
		assert(actual[0] instanceof Text);
		expect(actual[0].textContent).toBe("Hello");
	});
});
