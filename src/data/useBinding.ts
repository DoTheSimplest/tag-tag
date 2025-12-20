export function useBinding<T>(key: string): Binding<T, T>;
export function useBinding<T, TResult>(
	key: string,
	map: (value: T) => TResult,
): Binding<T, TResult>;
export function useBinding<T>(key: string, map = (value: T) => value) {
	return new Binding(key, map);
}

export class Binding<T = any, TResult = any> {
	constructor(
		public key: string,
		public map: (value: T) => TResult,
	) {}
}
