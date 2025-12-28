import { describe, it } from "vitest";
import { div, Modify, useState } from "../../src";

describe("animate", () => {
	it("simple duration", () => {
		Modify(document.body, { html: "" }, [
			div(
				"Hello!",
				{ css: { background: "blue" } },
				{ css: { background: "lime" }, animate: 1000 },
				{ text: "Animation Finished" },
			),
		]);
	});

	it("state", () => {
		Modify(document.body, { html: "" }, [
			div(
				"Hello!",
				{ css: { background: "blue" } },
				{ css: { background: useState("lime") }, animate: 1000 },
				{ text: "Animation Finished" },
			),
		]);
	});

	it("{}", () => {
		Modify(document.body, { html: "" }, [
			div(
				"Hello!",
				{ css: { background: "blue" } },
				{ css: { background: "lime" }, animate: {} },
				{ text: "Animation Finished" },
			),
		]);
	});
	it("{duration: 1000}", () => {
		Modify(document.body, { html: "" }, [
			div(
				"Hello!",
				{ css: { background: "blue" } },
				{ css: { background: "lime" }, animate: { duration: 1000 } },
				{ text: "Animation Finished" },
			),
		]);
	});

	it(`{ easing: undefined } is "swing"`, () => {
		Modify(document.body, { html: "" }, [
			div(
				"Hello!",
				{ css: { left: "0px", background: "blue", position: "absolute" } },
				{
					css: { left: "100px" },
					animate: { duration: 1000 },
				},
			),
		]);
	});

	it(`{ easing: "linear" }`, () => {
		Modify(document.body, { html: "" }, [
			div(
				"Hello!",
				{ css: { left: "0px", background: "blue", position: "absolute" } },
				{
					css: { left: "100px" },
					animate: { duration: 1000, easing: "linear" },
				},
			),
		]);
	});
});
