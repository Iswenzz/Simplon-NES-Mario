import IRenderable from "../IRenderable";
import Direction from "../utils/Direction";
import Vector from "../math/Vector";
import GeneralAi from "./GeneralAI";
import AtlasImage from "../graphics/AtlasImage";
import marioAtlas from "../assets/mario_atlas.json";
import Animation from "../graphics/Animation";

export default class Mario extends GeneralAi implements IRenderable
{
	public constructor(spawnVector?: Vector)
	{
		super(spawnVector);

		this.size = new Vector(18, 18);
		this.atlas = new AtlasImage(this.game.imageFactory.getImage("mario"), marioAtlas);
		this.sprintAnimation = new Animation(this.atlas, "sprint", 3);

		this.direction = Direction.RIGHT;
		this.originalVelocity = new Vector(0, -4);
		this.velocity = Vector.copy(this.originalVelocity);
		this.gravity = 15;
	}

	public frame()
	{
		// Sprint
		this.isSprinting = this.game.controls.keysDown["Shift"];
		this.speed = this.isSprinting ? 220 : 150;

		// Directions
		if (this.game.controls.keysDown["ArrowRight"])
			this.moveRight();
		else if (this.game.controls.keysDown["ArrowLeft"])
			this.moveLeft();
		else
			this.atlas.setSprite("idle");

		// Jump
		if (this.isJumping || this.game.controls.keysDown["ArrowUp"])
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
