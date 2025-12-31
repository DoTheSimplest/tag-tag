import { assert, describe, it } from "vitest";
import { Tag } from "../src";

describe(Tag, () => {
	it("type parameter", () => {
		const video = Tag<HTMLVideoElement>("<video></video>", (e) => {
			assert.equal(e.src, "");
		});
		assert.equal(video.tagName, "VIDEO");
	});
});
