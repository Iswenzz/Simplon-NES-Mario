export default class Matrix3x2
{
	public m11: number;
	public m12: number;
	public m21: number;
	public m22: number;
	public dx: number;
	public dy: number;

	public static identity: Matrix3x2 = new Matrix3x2(1, 0, 0, 1, 0, 0);

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

	public setScale(m11: number, m22: number) 
	{ 
		this.m11 = m11; 
		this.m22 = m22;
	}

	public setTranslation(dx: number, dy: number) 
	{ 
		this.dx = dx;
		this.dy = dy;
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
		return { x: this.m11, y: this.m22 }; 
	}

	public getTranslation() 
	{ 
		return { x: this.dx, y: this.dy };
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
