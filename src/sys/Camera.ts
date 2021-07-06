import Matrix3x2 from "../math/Matrix3x2";
import Canvas from "./Canvas";
import Game from "./Game";

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

	public renderLeft(bitmap: HTMLImageElement, position: Point, size: Size)
	{
		const mat = new Matrix3x2(
			this.matrix.m11, this.matrix.m12, 
			this.matrix.m21, this.matrix.m22,
			this.matrix.dx, this.matrix.dy);

		mat.setTranslation(
			mat.dx + size.width / 2, 
			mat.dy + size.height / 2);
		mat.setScale(-mat.m11, mat.m22);
		this.canvas.ctx.setTransform(
			mat.m11, mat.m12, 
			mat.m21, mat.m22, 
			mat.dx, mat.dy);
		this.canvas.ctx.drawImage(bitmap, 
			-position.x, position.y - size.height / 2, 
			size.width, size.height);
		this.canvas.ctx.setTransform(
			this.matrix.m11, this.matrix.m12, 
			this.matrix.m21, this.matrix.m22,
			this.matrix.dx, this.matrix.dy);
	}

	public renderRight(bitmap: HTMLImageElement, position: Point, size: Size)
	{
		const mat = new Matrix3x2(
			this.matrix.m11, this.matrix.m12, 
			this.matrix.m21, this.matrix.m22,
			this.matrix.dx, this.matrix.dy);

		mat.setScale(mat.m11, mat.m22); 
		this.canvas.ctx.setTransform(
			mat.m11, mat.m12, 
			mat.m21, mat.m22, 
			mat.dx, mat.dy); 
		this.canvas.ctx.drawImage(bitmap, 
			position.x - size.width / 2, position.y, 
			size.width, size.height);
		this.canvas.ctx.setTransform(
			this.matrix.m11, this.matrix.m12, 
			this.matrix.m21, this.matrix.m22,
			this.matrix.dx, this.matrix.dy);
	}
}
