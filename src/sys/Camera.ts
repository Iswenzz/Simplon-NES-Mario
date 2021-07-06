import Matrix3x2 from "../math/Matrix3x2";
import Canvas from "./Canvas";
import Game from "../Game";
import Vector from "../math/Vector";

export default class Camera
{
	public matrix: Matrix3x2;
	public canvas: Canvas;

	public constructor()
	{
		const { canvas } = Game.getInstance();

		this.matrix = Matrix3x2.identity;
		this.canvas = canvas;
	}

	public renderLeft(bitmap: HTMLImageElement, position: Vector, size: Vector)
	{
		const matrix = new Matrix3x2(
			this.matrix.m11, this.matrix.m12, 
			this.matrix.m21, this.matrix.m22,
			this.matrix.dx, this.matrix.dy);
		const nSize = Vector.multiply(size, this.canvas.resolutionZoom);
		matrix.setTranslation(
			matrix.dx + nSize.x / 2, 
			matrix.dy + nSize.y / 2);
		matrix.setScale(-matrix.m11, matrix.m22);

		this.canvas.ctx.setTransform(
			matrix.m11, matrix.m12, 
			matrix.m21, matrix.m22, 
			matrix.dx, matrix.dy);

		this.canvas.render(bitmap, 
			new Vector(-position.x, position.y - size.y / 2), 
			size);

		this.canvas.ctx.setTransform(
			this.matrix.m11, this.matrix.m12, 
			this.matrix.m21, this.matrix.m22,
			this.matrix.dx, this.matrix.dy);
	}

	public renderRight(bitmap: HTMLImageElement, position: Vector, size: Vector)
	{
		const matrix = new Matrix3x2(
			this.matrix.m11, this.matrix.m12, 
			this.matrix.m21, this.matrix.m22,
			this.matrix.dx, this.matrix.dy);
		matrix.setScale(matrix.m11, matrix.m22); 

		this.canvas.ctx.setTransform(
			matrix.m11, matrix.m12, 
			matrix.m21, matrix.m22, 
			matrix.dx, matrix.dy); 

		this.canvas.render(bitmap,
			new Vector(position.x - size.x / 2, position.y),
			size);

		this.canvas.ctx.setTransform(
			this.matrix.m11, this.matrix.m12, 
			this.matrix.m21, this.matrix.m22,
			this.matrix.dx, this.matrix.dy);
	}
}
