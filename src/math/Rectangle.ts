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

	public intersectCorner(rectangle: Rectangle, 
		selectedCorners: (keyof Corners)[] = ["topLeft", "bottomRight", "topRight", "bottomLeft"])
	{
		const corners = {
			topLeft: this.intersectPoint(rectangle.getTopLeft()),
			bottomRight: this.intersectPoint(rectangle.getBottomRight()),
			topRight: this.intersectPoint(rectangle.getTopRight()),
			bottomLeft: this.intersectPoint(rectangle.getBottomLeft()),
		};
		return selectedCorners.some(k => corners[k]);
	}

	public intersectPoint(point: Vector)
	{
		return point.x > this.x && point.x < this.x + this.width && point.y > this.y && point.y < this.y + this.height;
	}

	public intersect(rectangle: Rectangle)
	{
		const intersectionX1 = Math.max(this.x, rectangle.x);
		const intersectionX2 = Math.min(this.x + this.width, rectangle.x + rectangle.width);
		if (intersectionX2 < intersectionX1)
			return false;
	
		const intersectionY1 = Math.max(this.y, rectangle.y);
		const intersectionY2 = Math.min(this.y + this.height, rectangle.y + rectangle.height);
		if (intersectionY2 < intersectionY1)
			return false;
	
		return new Rectangle(intersectionX1, intersectionY1,
			intersectionX2 - intersectionX1,
			intersectionY2 - intersectionY1);
	}

	public getTopLeft()
	{
		return new Vector(this.x, this.y);
	}

	public getTopRight()
	{
		return new Vector(this.x + this.width, this.y);
	}

	public getBottomLeft()
	{
		return new Vector(this.x, this.y + this.height);
	}

	public getBottomRight()
	{
		return new Vector(this.x + this.width, this.y + this.height);
	}

	public static copy(rect: Rectangle)
	{
		return new Rectangle(rect.x, rect.y, rect.width, rect.height);
	}
}
