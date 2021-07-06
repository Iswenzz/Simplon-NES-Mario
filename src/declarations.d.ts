declare module "*";

type Nullable<T> = T | null;
type Optional<T> = T | undefined;

type Vector = {
	x: number,
	y: number
};

type Vector = {
	width: number,
	height: number
};

type Rectangle = {
	x: number,
	y: number,
	width: number,
	height: number
};

type BoundingBox = Rectangle;
