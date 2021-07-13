import Game from "Game";
import AtlasImage from "graphics/AtlasImage";
import IRenderable from "graphics/IRenderable";
import Rectangle from "math/Rectangle";
import Vector from "math/Vector";

export default abstract class AbstractAi implements IRenderable
{
	protected game: Game;

	public atlas: AtlasImage;
	public size: Vector;

	public rectangle: Rectangle;
	public position: Vector;
	public spawnPoint: Vector;

	public health: number;
	public maxHealth: number;
	public receiveDamage = true;
	public canDamage = true;
	public canControl = true;
	public isDead = false;

	protected constructor(spawnPoint?: Vector)
	{
		this.game = Game.getInstance();
		this.game.entities.push(this);

		this.maxHealth = 100;
		this.health = this.maxHealth;
		
		this.size = new Vector(18, 18);
		this.spawnPoint = spawnPoint;
		this.position = Vector.copy(this.spawnPoint);
		this.rectangle = new Rectangle(this.position.x, this.position.y, 
			this.size.x, this.size.y);
	}

	public damage(value: number)
	{
		if (this.receiveDamage)
			this.health -= value;
	}

	public kill()
	{
		this.isDead = true;
		this.canControl = false;
		this.canDamage = false;
		this.receiveDamage = false;
		this.health = 0;
	}

	public frame()
	{
		this.rectangle.setRect(this.position.x, this.position.y, this.size.x, this.size.y);
	}
}
