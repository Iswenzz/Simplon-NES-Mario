export default class Canvas
{
	target: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	
	constructor(canvasId: string)
	{
		this.target = document.getElementById(canvasId) as HTMLCanvasElement;
		this.target.height = window.innerHeight;
		this.target.width = window.innerWidth;
		this.ctx = this.target.getContext("2d");
		this.clear();
	}

	clear()
	{
		this.ctx.fillStyle = "#000";
		this.ctx.fillRect(0, 0, this.target.width, this.target.height);
	}

	beginDraw()
	{
		this.ctx.beginPath();
	}

	endDraw()
	{
		this.ctx.closePath();
	}
}
