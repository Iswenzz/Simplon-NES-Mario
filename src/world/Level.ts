import Canvas from "../sys/Canvas";
import IRenderable from "../IRenderable";
import Game from "../sys/Game";

export default class Level implements IRenderable
{
	public canvas: Canvas;
	public zoom: Size = { width: 2.4, height: 1 };
	public bitmap: HTMLImageElement;

	public originalPosition: Point;
	public position: Point;

	public constructor(bitmapPath: string, topLeftPoint?: Point)
	{
		const { canvas } = Game.getInstance();

		this.canvas = canvas;
		this.bitmap = new Image();
		this.bitmap.src = bitmapPath;

		this.originalPosition = topLeftPoint || { x: 0, y: 0 };
		this.position = { ...this.originalPosition };
	}

	public frame()
	{
		this.canvas.ctx.drawImage(this.bitmap, 
			this.position.x, this.position.y, 
			this.bitmap.width * this.zoom.width, 
			this.canvas.target.height * this.zoom.height);
	}
}
