import Animation from "../graphics/Animation";
import IRenderable from "../IRenderable";
import Rectangle from "../math/Rectangle";
import Vector from "../math/Vector";
import Direction from "../utils/Direction";
import AbstractAi from "./AbstractAi";

export default class GeneralAi extends AbstractAi implements IRenderable
{
	public direction: Direction;
	public originalVelocity: Vector;
	public velocity: Vector;
	public gravity: number;
	public speed: number;
	public sprintSpeed = 220;
	public walkSpeed = 150;

	public sprintAnimation: Animation;

	public isJumping: boolean;
	public isSprinting: boolean;

	public constructor(spawnVector?: Vector)
	{
		super(spawnVector);

		this.direction = Direction.LEFT;
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
			this.atlas.setSprite("idle");
			return;
		}

		this.atlas.setSprite("jump");
		this.isJumping = true;
		this.velocity.y += this.gravity * this.game.deltaTime;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	public run()
	{
		this.sprintAnimation.setInterval(this.isSprinting ? 10 : 20);
		this.sprintAnimation.frame();
	}

	public kill()
	{

	}

	public moveLeft()
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

	public moveRight()
	{
		this.rectangle.setRect(
			this.position.x - this.rectangle.width, this.position.y, 
			this.size.x, this.size.y);
			
		const value = this.speed * this.game.deltaTime;
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

	public frame()
	{
		// Sprint
		this.speed = this.isSprinting ? this.sprintSpeed : this.walkSpeed;

		// Directions
		if (this.direction === Direction.RIGHT)
			this.moveRight();
		else if (this.direction === Direction.LEFT)
			this.moveLeft();
		else
			this.atlas.setSprite("idle");

		// Jump
		if (this.isJumping)
			this.jump();

		// Render image
		if (this.atlas.currentAtlas.loaded)
		{
			if (this.direction === Direction.LEFT)
				this.game.canvas.renderLeft(this.atlas.currentAtlas.bitmap, this.position, this.size);
			else
				this.game.canvas.renderRight(this.atlas.currentAtlas.bitmap, this.position, this.size);
		}
	}
}
