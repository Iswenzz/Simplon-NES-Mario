import Matrix3x2 from "../math/Matrix3x2";
import Canvas from "./Canvas";
import Game from "../Game";
import Vector from "../math/Vector";

export default class Camera
{
	private canvas: Canvas;
	
	public matrix: Matrix3x2;

	public constructor()
	{
		const { canvas } = Game.getInstance();

		this.canvas = canvas;
		this.matrix = new Matrix3x2(this.canvas.resolutionZoom.x, 0, 0, 
			this.canvas.resolutionZoom.y, 0, 0);
		this.canvas.ctx.setTransform(this.matrix.m11, this.matrix.m12, 
			this.matrix.m21, this.matrix.m22,
			this.matrix.dx, this.matrix.dy);
	}

	public translateX(value: number)
	{
		const matrixPosition = this.matrix.getTranslation();
		matrixPosition.add(new Vector(value * this.canvas.resolutionZoom.x, 0));
		this.matrix.setTranslation(matrixPosition);
	}

	public scale(size: Vector)
	{
		this.matrix.setScale(size);
	}

	public renderLeft(bitmap: HTMLImageElement, position: Vector, size: Vector)
	{
		const matrix = Matrix3x2.create(this.matrix);
		matrix.setScale(new Vector(-matrix.m11, matrix.m22));

		this.canvas.ctx.setTransform(
			matrix.m11, matrix.m12, 
			matrix.m21, matrix.m22, 
			matrix.dx, matrix.dy);

		this.canvas.render(bitmap, 
			new Vector(-position.x - size.x, position.y), 
			size);

		this.canvas.ctx.setTransform(
			this.matrix.m11, this.matrix.m12, 
			this.matrix.m21, this.matrix.m22,
			this.matrix.dx, this.matrix.dy);
	}

	public renderRight(bitmap: HTMLImageElement, position: Vector, size: Vector)
	{
		const matrix = Matrix3x2.create(this.matrix);
		matrix.setScale(new Vector(matrix.m11, matrix.m22)); 

		this.canvas.ctx.setTransform(
			matrix.m11, matrix.m12, 
			matrix.m21, matrix.m22, 
			matrix.dx, matrix.dy); 

		this.canvas.render(bitmap,
			new Vector(position.x, position.y),
			size);

		this.canvas.ctx.setTransform(
			this.matrix.m11, this.matrix.m12, 
			this.matrix.m21, this.matrix.m22,
			this.matrix.dx, this.matrix.dy);
	}
}
