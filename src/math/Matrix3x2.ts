import Vector from "./Vector";

export default class Matrix3x2
{
	public m11: number;
	public m12: number;
	public m21: number;
	public m22: number;
	public dx: number;
	public dy: number;

	public static identity: Matrix3x2 = new Matrix3x2(2.15, 0, 0, 2.15, 0, 0);

	public constructor(m11: number, m12: number, 
		m21: number, m22: number, 
		dx: number, dy: number)
	{
		this.m11 = m11;
		this.m12 = m12;
		this.m21 = m21;
		this.m22 = m22;
		this.dx = dx;
		this.dy = dy;
	}

	public static create(matrix: Matrix3x2)
	{
		return new Matrix3x2(
			matrix.m11, matrix.m12,
			matrix.m21, matrix.m22,
			matrix.dx, matrix.dy);
	}

	public setScale(vec: Vector) 
	{ 
		this.m11 = vec.x; 
		this.m22 = vec.y;
	}

	public setTranslation(vec: Vector) 
	{ 
		this.dx = vec.x;
		this.dy = vec.y;
	}

	public setTransform(m11: number, m12: number, 
		m21: number, m22: number, 
		dx: number, dy: number)
	{
		this.m11 = m11;
		this.m12 = m12;
		this.m21 = m21;
		this.m22 = m22;
		this.dx = dx;
		this.dy = dy;
	}

	public getScale() 
	{ 
		return new Vector(this.m11, this.m22);
	}

	public getTranslation() 
	{ 
		return new Vector(this.dx, this.dy);
	}

	public getTransform() 
	{ 
		return [
			this.m11, this.m12,
			this.m21, this.m22,
			this.dx, this.dy
		];
	}
}
