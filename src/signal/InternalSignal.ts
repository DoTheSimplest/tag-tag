export abstract class InternalSignal<T> {
	subscribers = new Set<InternalComputed<any>>();

	prepareUpdate() {
		for (const subscriber of this.subscribers) {
			subscriber.prepareUpdate();
		}
	}

	abstract get(): T;
}

export class InternalState<T> extends InternalSignal<T> {
	constructor(public value: T) {
		super();
	}

	get() {
		return this.value;
	}
	set(value: T) {
		this.value = value;
		this.prepareUpdate();
		this.updateFromLeaft();
	}

	updateFromLeaft() {
		for (const subscriber of this.subscribers) {
			subscriber.updateFromLeaf();
		}
	}
}

export class InternalComputed<T> extends InternalSignal<T> {
	cache?: T;
	dirty = true;
	constructor(public map: () => T) {
		super();
	}

	get() {
		if (this.dirty) {
			this.cache = this.map();
			this.dirty = false;
		}
		return this.cache!;
	}

	prepareUpdate() {
		if (this.dirty) return;

		this.dirty = true;
		super.prepareUpdate();
	}

	updateFromLeaf() {
		for (const subscriber of this.subscribers) {
			subscriber.updateFromLeaf();
		}
		if (this.subscribers.size === 0) {
			this.get();
		}
	}
}
