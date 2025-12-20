export function useBinding<T, TResult>(
	key: string,
	map: (value: T) => TResult,
) {
	return new Binding(key, map);
}

export class Binding<T = any, TResult = any> {
	constructor(
		public key: string,
		public map: (value: T) => TResult,
	) {}
}
