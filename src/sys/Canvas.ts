import Vector from "../math/Vector";
import Camera from "./Camera";

export default class Canvas
{
	public target: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public camera: Camera;
	public resolutionZoom: Vector;
	
	public constructor(canvasId: string)
	{
		this.target = document.getElementById(canvasId) as HTMLCanvasElement;
		this.target.height = window.innerHeight;
		this.target.width = window.innerWidth;
		this.resolutionZoom = new Vector(this.target.width / 1024, this.target.height / 576);
		this.resolutionZoom.multiply(new Vector(2.15, 2.15));
	}

	public initialize()
	{
		this.ctx = this.target.getContext("2d");
		this.camera = new Camera();
	}

	public render(bitmap: HTMLImageElement, position: Vector, size: Vector)
	{
		const nSize = Vector.multiply(size, this.resolutionZoom);
		const nPosition = Vector.multiply(position, this.resolutionZoom);

		this.ctx.drawImage(bitmap,
			nPosition.x, nPosition.y,
			nSize.x, nSize.y);
	}

	public renderRight(bitmap: HTMLImageElement, position: Vector, size: Vector)
	{
		this.camera.renderRight(bitmap, position, size);
	}

	public renderLeft(bitmap: HTMLImageElement, position: Vector, size: Vector)
	{
		this.camera.renderLeft(bitmap, position, size);
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
