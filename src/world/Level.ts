import Canvas from "../sys/Canvas";
import IRenderable from "../IRenderable";
import Game from "../Game";
import Vector from "../math/Vector";

export default class Level implements IRenderable
{
	private canvas: Canvas;

	public bitmap: HTMLImageElement;
	public originalPosition: Vector;
	public position: Vector;
	public size: Vector;

	public constructor(bitmapPath: string, topLeftVector?: Vector)
	{
		const { canvas } = Game.getInstance();

		this.canvas = canvas;
		this.bitmap = new Image();
		this.bitmap.src = bitmapPath;

		this.originalPosition = Vector.create(topLeftVector);
		this.position = Vector.create(this.originalPosition);
		this.size = new Vector(this.bitmap.width, this.bitmap.height);
	}

	public frame()
	{
		this.canvas.render(this.bitmap, this.position, this.size);
	}
}
