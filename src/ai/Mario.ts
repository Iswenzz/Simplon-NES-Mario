import Canvas from "../sys/Canvas";
import mario from "../assets/ai/mario.png";
import IRenderable from "../IRenderable";
import Game from "../sys/Game";
import Controls from "../sys/Controls";
import Direction from "../utils/Direction";

export default class Mario implements IRenderable
{
	public controls: Controls;
	public bitmap: HTMLImageElement;
	public canvas: Canvas;
	public size: Size;

	public position: Point;
	public spawnPoint: Point;

	public direction: Direction;
	public originalVelocity: Point;
	public velocity: Point;
	public gravity: number;
	public speed: number;

	public isJumping = false;

	public constructor(spawnPoint?: Point)
	{
		const { controls, canvas } = Game.getInstance();

		this.canvas = canvas;
		this.controls = controls;
		this.bitmap = new Image();
		this.bitmap.src = mario;
		this.size = { width: 32, height: 32 };

		this.spawnPoint = spawnPoint;
		this.position = { ...this.spawnPoint } || { x: 0, y: 0 };

		this.direction = Direction.RIGHT;
		this.speed = 4;
		this.originalVelocity = { x: 0, y: -8 };
		this.velocity = { ...this.originalVelocity };
		this.gravity = 0.2;
	}

	public jump()
	{
		if (this.isJumping && this.position.y >= 465)
		{
			this.position.y = 465;
			this.velocity = { ...this.originalVelocity };
			this.isJumping = false;
			return;
		}

		this.isJumping = true;
		this.velocity.y += this.gravity;
		this.position.x += Math.round(this.velocity.x);
		this.position.y += Math.round(this.velocity.y);
	}

	public frame()
	{
		// Controls
		if (this.controls.keysDown["ArrowRight"])
		{
			this.direction = Direction.RIGHT;
			this.position.x += this.speed;
		}
		if (this.controls.keysDown["ArrowLeft"])
		{
			this.direction = Direction.LEFT;
			this.position.x -= this.speed;
		}
		if (this.isJumping || this.controls.keysDown["ArrowUp"])
			this.jump();

		// Render image
		if (this.direction === Direction.LEFT)
			this.canvas.renderLeft(this.bitmap, this.position, this.size);
		else
			this.canvas.renderRight(this.bitmap, this.position, this.size);
	}
}
