import Canvas from "../sys/Canvas";
import IRenderable from "../IRenderable";
import Game from "../Game";
import Controls from "../sys/Controls";
import Direction from "../utils/Direction";
import Vector from "../math/Vector";
import Rectangle from "../math/Rectangle";
import Texture from "../graphics/Texture";
import AtlasImage from "../graphics/AtlasImage";

export default class Mario implements IRenderable
{
	private controls: Controls;
	private canvas: Canvas;
	private frames: number;
	
	public atlas: AtlasImage;
	public currentAtlas: Texture;
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
		const { controls, canvas, imageFactory } = Game.getInstance();

		this.canvas = canvas;
		this.controls = controls;
		this.size = new Vector(18, 18);
		this.frames = 0;

		this.atlas = new AtlasImage(imageFactory.getImage("mario"));
		this.atlas.registerSprite("idle", new Rectangle(520, 190, 64, 64));
		this.atlas.registerSprite("sprint_a", new Rectangle(240, 190, 64, 64));
		this.atlas.registerSprite("sprint_b", new Rectangle(140, 190, 64, 64));
		this.atlas.registerSprite("sprint_c", new Rectangle(40, 190, 64, 64));
		this.atlas.registerSprite("jump", new Rectangle(415, 190, 64, 64));
		this.atlas.registerSprite("dead", new Rectangle(520, 450, 64, 64));
		this.currentAtlas = this.atlas.getSprite("idle");

		this.spawnVector = spawnVector;
		this.position = Vector.copy(this.spawnVector);

		this.direction = Direction.RIGHT;
		this.speed = 1.5;
		this.originalVelocity = new Vector(0, -7);
		this.velocity = Vector.copy(this.originalVelocity);
		this.gravity = 0.3;
	}

	public jump()
	{
		if (this.isJumping && this.position.y >= 190)
		{
			this.position.y = 190;
			this.velocity = Vector.copy(this.originalVelocity);
			this.isJumping = false;
			this.currentAtlas = this.atlas.getSprite("idle");
			return;
		}

		this.currentAtlas = this.atlas.getSprite("jump");
		this.isJumping = true;
		this.velocity.y += this.gravity;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	public run()
	{
		if (this.frames % 4 === 0)
		{
			switch (this.currentAtlas.name)
			{
				default:
				case "sprint_a": 
					this.currentAtlas = this.atlas.getSprite("sprint_c");
					break;
				case "sprint_b": 
					this.currentAtlas = this.atlas.getSprite("sprint_b");
					break;
				case "sprint_c": 
					this.currentAtlas = this.atlas.getSprite("sprint_a");
					break;
			}
		}
	}

	public frame()
	{
		// Controls
		if (this.controls.keysDown["ArrowRight"])
		{
			this.direction = Direction.RIGHT;
			this.position.x += this.speed;
			this.canvas.camera.translateX(-this.speed);
			this.run();
		}
		else if (this.controls.keysDown["ArrowLeft"])
		{
			this.direction = Direction.LEFT;
			this.position.x -= this.speed;
			this.canvas.camera.translateX(this.speed);
			this.run();
		}
		else
			this.currentAtlas = this.atlas.getSprite("idle");

		if (this.isJumping || this.controls.keysDown["ArrowUp"])
			this.jump();

		// Sprint
		this.speed = this.controls.keysDown["Shift"] ? 3 : 1.5;

		// Render image
		if (this.currentAtlas.loaded)
		{
			if (this.direction === Direction.LEFT)
				this.canvas.renderLeft(this.currentAtlas.bitmap, this.position, this.size);
			else
				this.canvas.renderRight(this.currentAtlas.bitmap, this.position, this.size);
		}
		this.frames++;
	}
}
