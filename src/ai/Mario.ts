import Canvas from "../sys/Canvas";
import mario from "../assets/ai/mario.png";
import IRenderable from "../IRenderable";
import Game from "../Game";
import Controls from "../sys/Controls";
import Direction from "../utils/Direction";
import Vector from "../math/Vector";

export default class Mario implements IRenderable
{
	public controls: Controls;
	public bitmap: HTMLImageElement;
	public canvas: Canvas;
	public size: Vector;

	public position: Vector;
	public spawnVector: Vector;

	public direction: Direction;
	public originalVelocity: Vector;
	public velocity: Vector;
	public gravity: number;
	public speed: number;

	public isJumping = false;

	public constructor(spawnVector?: Vector)
	{
		const { controls, canvas } = Game.getInstance();

		this.canvas = canvas;
		this.controls = controls;
		this.bitmap = new Image();
		this.bitmap.src = mario;
		this.size = new Vector(18, 18);

		this.spawnVector = spawnVector;
		this.position = Vector.create(this.spawnVector);

		this.direction = Direction.RIGHT;
		this.speed = 1;
		this.originalVelocity = new Vector(0, -2.7);
		this.velocity = Vector.create(this.originalVelocity);
		this.gravity = 0.05;
	}

	public jump()
	{
		if (this.isJumping && this.position.y >= 190)
		{
			this.position.y = 190;
			this.velocity = Vector.create(this.originalVelocity);
			this.isJumping = false;
			return;
		}

		this.isJumping = true;
		this.velocity.y += this.gravity;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
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
