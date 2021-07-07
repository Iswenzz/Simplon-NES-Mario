import Vector from "./Vector";

export type Corners = {
	topLeft: Vector,
	bottomRight: Vector,
	topRight: Vector,
	bottomLeft: Vector
};

export default class Rectangle
{
	public x: number;
	public y: number;
	public width: number;
	public height: number;

	public constructor(x: number, y: number, 
		width: number, height: number)
	{
		this.setRect(x, y, width, height);
	}

	public setRect(x: number, y: number, 
		width: number, height: number)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	public static copy(rect: Rectangle)
	{
		return new Rectangle(rect.x, rect.y, rect.width, rect.height);
	}
}
