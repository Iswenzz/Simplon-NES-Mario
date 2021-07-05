import Canvas from "../sys/Canvas";
import IRenderable from "../IRenderable";

export default class Level implements IRenderable
{
	canvas: Canvas;
	zoom: Size = { width: 2.4, height: 1 };
	bitmap: HTMLImageElement;

	constructor(canvas: Canvas, bitmapPath: string)
	{
		this.canvas = canvas;
		this.bitmap = new Image();
		this.bitmap.src = bitmapPath;
	}

	frame()
	{
		this.canvas.ctx.drawImage(this.bitmap, 0, 0, 
			this.bitmap.width * this.zoom.width, 
			this.canvas.target.height * this.zoom.height);
	}
}
