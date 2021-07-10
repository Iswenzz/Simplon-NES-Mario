import Animation from "../graphics/Animation";
import IRenderable from "../graphics/IRenderable";
import Rectangle from "../math/Rectangle";
import Vector from "../math/Vector";
import Condition from "../utils/decorators/Condition";
import Direction from "../utils/Direction";
import PixelType from "../utils/PixelType";
import AbstractAi from "./AbstractAi";

export default class GeneralAi extends AbstractAi implements IRenderable
{
	public life: number;
	public direction: Direction;
	public originalVelocity: Vector;
	public velocity: Vector;
	public gravity: number;
	public speed: number;
	public sprintSpeed = 220;
	public walkSpeed = 150;

	public sprintAnimation: Animation;

	public isJumping = false;
	public isFalling = false;
	public isSprinting = false;
	public deathDone = false;

	public constructor(spawnPoint?: Vector)
	{
		super(spawnPoint);

		this.life = 1;
		this.direction = Direction.LEFT;
		this.originalVelocity = new Vector(0, 0);
		this.velocity = Vector.copy(this.originalVelocity);
		this.gravity = 15;
		this.speed = this.isSprinting ? this.sprintSpeed : this.walkSpeed;
	}

	@Condition({
		property: ["isJumping", false]
	})
	public fall()
	{
		const predictedMove = Rectangle.copy(this.rectangle);
		const value = Math.abs(Math.round(this.velocity.y + (this.gravity * this.game.deltaTime)));
		predictedMove.y += value;

		if (!this.game.level.intersect(predictedMove, PixelType.COLLISION, 
			["bottomLeft", "bottomRight"]))
		{
			if (this.velocity.y < 0)
				this.velocity.y = 0;

			this.isFalling = true;
			this.velocity.y += this.gravity * this.game.deltaTime;
			this.position.y += Math.round(this.velocity.y);
		}
		else
		{
			this.velocity = Vector.copy(this.originalVelocity);
			this.isFalling = false;
		}
	}

	@Condition({ 
		property: ["isJumping", true]
	})
	public jump()
	{
		const predictedMove = Rectangle.copy(this.rectangle);
		predictedMove.y += Math.abs(Math.round(this.velocity.y + (this.gravity * this.game.deltaTime)));

		if (this.isJumping && this.game.level.intersect(predictedMove, PixelType.COLLISION))
		{
			this.velocity = Vector.copy(this.originalVelocity);
			this.isJumping = false;
			this.atlas.setSprite("idle");
			return;
		}

		this.atlas.setSprite("jump");
		this.isJumping = true;
		this.velocity.y += this.gravity * this.game.deltaTime;
		this.position.y += Math.round(this.velocity.y);
	}

	public idle()
	{
		this.atlas.setSprite("idle");
	}

	public sprint()
	{
		this.speed = this.isSprinting ? this.sprintSpeed : this.walkSpeed;
	}

	public run()
	{
		this.sprintAnimation.setInterval(this.isSprinting ? 10 : 20);
		this.sprintAnimation.frame();
	}

	@Condition({ 
		property: ["direction", Direction.LEFT]
	})
	public moveLeft()
	{	
		const value = Math.round(this.speed * this.game.deltaTime);
		this.direction = Direction.LEFT;
		const predictedMove = Rectangle.copy(this.rectangle);
		predictedMove.x -= value;

		if (!this.game.level.intersect(predictedMove, PixelType.COLLISION,
			["topLeft", "bottomLeft"]))
		{
			this.position.x -= value;
			this.game.canvas.camera.translateX(value);
		}
		this.run();
	}

	@Condition({ 
		property: ["direction", Direction.RIGHT]
	})
	public moveRight()
	{
		const value = Math.round(this.speed * this.game.deltaTime);
		this.direction = Direction.RIGHT;
		const predictedMove = Rectangle.copy(this.rectangle);
		predictedMove.x += value;

		if (!this.game.level.intersect(predictedMove, PixelType.COLLISION,
			["topRight", "bottomRight"]))
		{
			this.position.x += value;
			this.game.canvas.camera.translateX(-value);
		}
		this.run();
	}

	@Condition({
		property: ["isDead", true]
	})
	public kill() 
	{
		this.life--;
		super.kill();
		this.atlas.setSprite("death");
		this.deathDone = true;
	}

	public frame()
	{
		// Events
		this.idle();
		this.sprint();
		this.moveLeft();
		this.moveRight();
		this.fall();
		this.jump();
		this.kill();

		// Render image
		if (this.atlas.currentAtlas.loaded)
		{
			if (this.direction === Direction.LEFT)
				this.game.canvas.renderLeft(this.atlas.currentAtlas.bitmap, this.position, this.size);
			else
				this.game.canvas.renderRight(this.atlas.currentAtlas.bitmap, this.position, this.size);
		}
		super.frame();
	}
}
