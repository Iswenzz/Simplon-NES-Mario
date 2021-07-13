import IRenderable from "graphics/IRenderable";
import Direction from "utils/Direction";
import Vector from "math/Vector";
import AtlasImage from "graphics/AtlasImage";
import Animation from "graphics/Animation";
import PixelType from "utils/PixelType";
import KeyDown from "utils/decorators/KeyDown";
import Condition from "utils/decorators/Condition";
import Rectangle from "math/Rectangle";
import marioAtlas from "assets/ai/characters/mario/mario_atlas.json";
import GeneralAi from "ai/GeneralAi";

export default class Mario extends GeneralAi implements IRenderable
{
	public constructor(spawnPoint?: Vector)
	{
		super(spawnPoint);

		this.size = new Vector(18, 18);
		this.atlas = new AtlasImage(this.game.imageFactory.getImage("mario"), 
			marioAtlas as Record<string, any>);
		this.atlas.setSprite("idle");
		this.sprintAnimation = new Animation(this.atlas, "sprint", 3);

		this.life = 3;
		this.direction = Direction.RIGHT;
		this.originalVelocity = new Vector(0, -440);
		this.velocity = Vector.copy(this.originalVelocity);
		this.gravity = 1400;
	}

	@Condition({
		keydown: "ArrowUp",
		property: ["isJumping", true],
	})
	public jump()
	{
		const predictedMove = Rectangle.copy(this.rectangle);
		predictedMove.y += (this.velocity.y + this.gravity * this.game.deltaTime) * this.game.deltaTime;

		if (this.isJumping && this.game.level.intersect(predictedMove, PixelType.COLLISION))
		{
			this.velocity = Vector.copy(this.originalVelocity);
			this.isJumping = false;
			this.idle();
			return;
		}

		this.atlas.setSprite("jump");
		this.isJumping = true;
		this.velocity.y += this.gravity * this.game.deltaTime;
		this.position.y += this.velocity.y * this.game.deltaTime;
	}

	public sprint()
	{
		this.isSprinting = this.game.controls.keysDown["Shift"];
		this.speed = this.isSprinting ? this.sprintSpeed : this.walkSpeed;
	}

	@KeyDown("ArrowRight")
	public moveRight()
	{
		this.direction = Direction.RIGHT;
		super.moveRight();
	}

	@KeyDown("ArrowLeft")
	public moveLeft()
	{
		this.direction = Direction.LEFT;
		super.moveLeft();
	}

	@Condition({
		property: ["isDead", true],
		trigger: PixelType.DEATH,
		checkControls: false
	})
	public kill()
	{
		if (!this.isDead)
		{
			this.isDead = true;
			this.canControl = false;
			this.velocity = Vector.copy(this.originalVelocity);
			super.kill();
		}
		this.atlas.setSprite("death");
		this.velocity.y += this.gravity * this.game.deltaTime;
		this.position.y += this.velocity.y * this.game.deltaTime;
		
		if (this.position.y > this.game.level.size.y && !this.deathDone)
		{
			this.deathDone = true;
			alert("You died !");
		}
	}
}
