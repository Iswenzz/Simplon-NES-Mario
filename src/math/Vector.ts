export default class Vector
{
	public x = 0;
	public y = 0;

	public constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	public static copy(vec?: Vector)
	{
		return vec ? new Vector(vec.x, vec.y) : new Vector(0, 0);
	}

	public add(vec: Vector)
	{
		this.x += vec.x;
		this.y += vec.y;
	}

	public static add(a: Vector, b: Vector)
	{
		return new Vector(a.x + b.x, a.y + b.y);
	}

	public sub(vec: Vector)
	{
		this.x -= vec.x;
		this.y -= vec.y;
	}

	public static sub(a: Vector, b: Vector)
	{
		return new Vector(a.x - b.x, a.y - b.y);
	}

	public multiply(vec: Vector)
	{
		this.x *= vec.x;
		this.y *= vec.y;
	}

	public static multiply(a: Vector, b: Vector)
	{
		return new Vector(a.x * b.x, a.y * b.y);
	}

	public divide(vec: Vector)
	{
		this.x /= vec.x;
		this.y /= vec.y;
	}

	public static divide(a: Vector, b: Vector)
	{
		return new Vector(a.x / b.x, a.y / b.y);
	}
}
