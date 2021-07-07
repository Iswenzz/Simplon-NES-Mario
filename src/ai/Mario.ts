import IRenderable from "../IRenderable";
import Game from "../Game";
import Direction from "../utils/Direction";
import Vector from "../math/Vector";
import Rectangle from "../math/Rectangle";
import Texture from "../graphics/Texture";
import AtlasImage from "../graphics/AtlasImage";
import marioAtlas from "../assets/mario_atlas.json";

export default class Mario implements IRenderable
{
	private game: Game;
	
	public atlas: AtlasImage;
	public currentAtlas: Texture;
	public size: Vector;

	public rectangle: Rectangle;
	public position: Vector;
	public spawnVector: Vector;

	public direction: Direction;
	public originalVelocity: Vector;
	public velocity: Vector;
	public gravity: number;
	public speed: number;

	public isJumping = false;
	public isSprinting = false;

	public constructor(spawnVector?: Vector)
	{
		this.game = Game.getInstance();

		this.size = new Vector(18, 18);
		this.atlas = new AtlasImage(this.game.imageFactory.getImage("mario"), marioAtlas);
		this.currentAtlas = this.atlas.getSprite("idle");

		this.spawnVector = spawnVector;
		this.position = Vector.copy(this.spawnVector);
		this.rectangle = new Rectangle(this.position.x, this.position.y, 
			this.size.x, this.size.y);

		this.direction = Direction.RIGHT;
		this.originalVelocity = new Vector(0, -4);
		this.velocity = Vector.copy(this.originalVelocity);
		this.gravity = 15;
	}

	public jump()
	{
		const predictedMove = Rectangle.copy(this.rectangle);
		predictedMove.y += this.velocity.y + this.gravity;
		const test = this.game.level.intersect(predictedMove, "bottomLeft", "bottomRight");
		console.log(test);

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
		this.velocity.y += this.gravity * this.game.deltaTime;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	public run()
	{
		if (this.game.time % (this.isSprinting ? 10 : 20) === 0)
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
		// Sprint
		this.isSprinting = this.game.controls.keysDown["Shift"];
		this.speed = this.isSprinting ? 220 : 150;

		// Directions
		if (this.game.controls.keysDown["ArrowRight"])
		{
			this.rectangle.setRect(
				this.position.x - this.rectangle.width, this.position.y, 
				this.size.x, this.size.y);
				
			const value = this.speed * this.game.deltaTime;
			console.log(value);
			this.direction = Direction.RIGHT;
			const predictedMove = Rectangle.copy(this.rectangle);
			predictedMove.x += value;

			if (!this.game.level.intersect(predictedMove, "topRight", "bottomRight"))
			{
				this.position.x += value;
				this.game.canvas.camera.translateX(-value);
			}
			this.run();
		}
		else if (this.game.controls.keysDown["ArrowLeft"])
		{
			this.rectangle.setRect(
				this.position.x, this.position.y, 
				this.size.x, this.size.y);
				
			const value = this.speed * this.game.deltaTime;
			this.direction = Direction.LEFT;
			const predictedMove = Rectangle.copy(this.rectangle);
			predictedMove.x -= value;

			if (!this.game.level.intersect(predictedMove, "topLeft", "bottomLeft"))
			{
				this.position.x -= value;
				this.game.canvas.camera.translateX(value);
			}
			this.run();
		}
		else
			this.currentAtlas = this.atlas.getSprite("idle");

		// Jump
		if (this.isJumping || this.game.controls.keysDown["ArrowUp"])
			this.jump();

		// Render image
		if (this.currentAtlas.loaded)
		{
			if (this.direction === Direction.LEFT)
				this.game.canvas.renderLeft(this.currentAtlas.bitmap, this.position, this.size);
			else
				this.game.canvas.renderRight(this.currentAtlas.bitmap, this.position, this.size);
		}
	}
}
