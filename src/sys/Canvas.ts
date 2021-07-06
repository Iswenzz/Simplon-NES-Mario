import Camera from "./Camera";
import Game from "./Game";

export default class Canvas
{
	public target: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public camera: Camera;
	
	public constructor(canvasId: string)
	{
		this.target = document.getElementById(canvasId) as HTMLCanvasElement;
		this.target.height = window.innerHeight;
		this.target.width = window.innerWidth;

		this.ctx = this.target.getContext("2d");
	}

	public renderRight(bitmap: HTMLImageElement, position: Point, size: Size)
	{
		Game.getInstance().camera.renderRight(bitmap, position, size);
	}

	public renderLeft(bitmap: HTMLImageElement, position: Point, size: Size)
	{
		Game.getInstance().camera.renderLeft(bitmap, position, size);
	}

	public clear()
	{
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0, 0, this.target.width, this.target.height);
	}

	public beginDraw()
	{
		this.ctx.beginPath();
	}

	public endDraw()
	{
		this.ctx.closePath();
	}
}
