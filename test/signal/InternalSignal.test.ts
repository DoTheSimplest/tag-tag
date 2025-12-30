import { assert, describe, it } from "vitest";
import {
	InternalComputed,
	InternalState,
} from "../../src/signal/InternalSignal";

describe(InternalState, () => {
	it("get of computed", () => {
		const counter = new InternalState(4);
		const isEven = new InternalComputed(() => {
			return counter.get() % 2 === 0;
		});

		counter.subscribers.add(isEven);

		assert.equal(isEven.get(), true);
		counter.set(3);
		assert.equal(isEven.get(), false);
	});

	it("cache", () => {
		const counter = new InternalState(4);
		let mapCount = 0;
		const isEven = new InternalComputed(() => {
			mapCount++;
			return counter.get() % 2 === 0;
		});
		counter.subscribers.add(isEven);

		assert.equal(isEven.get(), true);
		assert.equal(isEven.get(), true);
		assert.equal(mapCount, 1);
	});

	it("dirty", () => {
		const counter = new InternalState(4);
		let mapCount = 0;
		const isEven = new InternalComputed(() => {
			mapCount++;
			return counter.get() % 2 === 0;
		});
		counter.subscribers.add(isEven);

		assert.equal(isEven.get(), true);
		assert.equal(isEven.get(), true);
		assert.equal(mapCount, 1);

		counter.set(3);

		assert.equal(isEven.get(), false);
		assert.equal(isEven.get(), false);
		assert.equal(mapCount, 2);
	});

	it("chain of computed", () => {
		const counter = new InternalState(4);
		let evenMapCount = 0;
		const isEven = new InternalComputed(() => {
			evenMapCount++;
			return counter.get() % 2 === 0;
		});
		let textMapCount = 0;
		const isEvenText = new InternalComputed(() => {
			textMapCount++;
			return isEven.get() ? `even` : `odd`;
		});
		counter.subscribers.add(isEven);
		isEven.subscribers.add(isEvenText);

		assert.equal(isEvenText.get(), "even");
		assert.equal(isEvenText.get(), "even");
		assert.equal(evenMapCount, 1);
		assert.equal(textMapCount, 1);

		counter.set(3);

		assert.equal(isEvenText.get(), "odd");
		assert.equal(isEvenText.get(), "odd");
		assert.equal(evenMapCount, 2);
		assert.equal(textMapCount, 2);
	});

	it("effect", () => {
		const counter = new InternalState(4);
		let evenMapCount = 0;
		const isEven = new InternalComputed(() => {
			evenMapCount++;
			return counter.get() % 2 === 0;
		});
		let textMapCount = 0;
		const isEvenText = new InternalComputed(() => {
			textMapCount++;
			return isEven.get() ? `even` : `odd`;
		});

		const effectLog = [] as string[];
		const effect = new InternalComputed<void>(() => {
			effectLog.push(isEvenText.get());
		});

		counter.subscribers.add(isEven);
		isEven.subscribers.add(isEvenText);
		isEvenText.subscribers.add(effect);

		effect.get();
		assert.deepEqual(effectLog, ["even"]);
		assert.equal(evenMapCount, 1);
		assert.equal(textMapCount, 1);

		counter.set(3);

		assert.deepEqual(effectLog, ["even", "odd"]);
		assert.equal(evenMapCount, 2);
		assert.equal(textMapCount, 2);
	});
});
