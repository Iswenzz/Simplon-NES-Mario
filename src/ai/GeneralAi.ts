import Animation from "../graphics/Animation";
import IRenderable from "../graphics/IRenderable";
import Rectangle from "../math/Rectangle";
import Vector from "../math/Vector";
import Action from "../utils/Action";
import Direction from "../utils/Direction";
import PixelType from "../utils/PixelType";
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
	public isFalling: boolean;
	public isSprinting: boolean;

	public constructor(spawnVector?: Vector)
	{
		super(spawnVector);

		this.direction = Direction.LEFT;
		this.originalVelocity = new Vector(0, 0);
		this.velocity = Vector.copy(this.originalVelocity);
		this.gravity = 15;
	}

	public fall()
	{
		const predictedMove = Rectangle.copy(this.rectangle);
		const value = Math.abs(Math.round(this.velocity.y + (this.gravity * this.game.deltaTime)));
		predictedMove.y += value;

		if (!this.game.level.intersect(predictedMove, PixelType.COLLISION, 
			"bottomLeft", "bottomRight"))
		{
			if (this.velocity.y < 0)
				this.velocity.y = 0;

			this.isFalling = true;
			this.velocity.y += this.gravity * this.game.deltaTime;
			this.position.y += this.velocity.y;
		}
		else
		{
			this.velocity = Vector.copy(this.originalVelocity);
			this.isFalling = false;
		}
	}

	public jump()
	{
		const predictedMove = Rectangle.copy(this.rectangle);
		predictedMove.y += Math.abs(Math.round(this.velocity.y + (this.gravity * this.game.deltaTime)));

		if (this.isJumping && this.game.level.intersect(predictedMove, PixelType.COLLISION, 
			"bottomLeft", "bottomRight", "topLeft", "topRight"))
		{
			this.velocity = Vector.copy(this.originalVelocity);
			this.isJumping = false;
			this.atlas.setSprite("idle");
			return;
		}

		this.atlas.setSprite("jump");
		this.isJumping = true;
		this.velocity.y += this.gravity * this.game.deltaTime;
		this.position.y += this.velocity.y;
	}

	public run()
	{
		this.sprintAnimation.setInterval(this.isSprinting ? 10 : 20);
		this.sprintAnimation.frame();
	}

	public kill() { }

	public moveLeft()
	{	
		const value = Math.round(this.speed * this.game.deltaTime);
		this.direction = Direction.LEFT;
		const predictedMove = Rectangle.copy(this.rectangle);
		predictedMove.x -= value;

		if (!this.game.level.intersect(predictedMove, PixelType.COLLISION,
			"topLeft", "bottomLeft"))
		{
			this.position.x -= value;
			this.game.canvas.camera.translateX(value);
		}
		this.run();
	}

	public moveRight()
	{
		const value = Math.round(this.speed * this.game.deltaTime);
		this.direction = Direction.RIGHT;
		const predictedMove = Rectangle.copy(this.rectangle);
		predictedMove.x += value;

		if (!this.game.level.intersect(predictedMove, PixelType.COLLISION,
			"topRight", "bottomRight"))
		{
			this.position.x += value;
			this.game.canvas.camera.translateX(-value);
		}
		this.run();
	}

	public idle()
	{
		this.atlas.setSprite("idle");
	}

	public sprint()
	{
		this.speed = this.isSprinting ? this.sprintSpeed : this.walkSpeed;
	}

	public frame()
	{
		Action.callback(this.isSprinting, this.sprint.bind(this), this.sprint.bind(this));
		Action.callback(this.isJumping, this.jump.bind(this), this.fall.bind(this));
		if (!Action.callback(this.direction === Direction.RIGHT, this.moveRight.bind(this)) &&
			!Action.callback(this.direction === Direction.LEFT, this.moveLeft.bind(this)))
			this.idle();

		// Render image
		if (this.atlas.currentAtlas.loaded)
		{
			if (this.direction === Direction.LEFT)
				this.game.canvas.renderLeft(this.atlas.currentAtlas.bitmap, this.position, this.size);
			else
				this.game.canvas.renderRight(this.atlas.currentAtlas.bitmap, this.position, this.size);
		}
		this.rectangle.setRect(this.position.x, this.position.y, this.size.x, this.size.y);
	}
}
