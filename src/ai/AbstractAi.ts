import Game from "../Game";
import AtlasImage from "../graphics/AtlasImage";
import IRenderable from "../IRenderable";
import Rectangle from "../math/Rectangle";
import Vector from "../math/Vector";

export default abstract class AbstractAi implements IRenderable
{
	protected game: Game;

	public atlas: AtlasImage;
	public size: Vector;

	public rectangle: Rectangle;
	public position: Vector;
	public spawnVector: Vector;

	public health: number;
	public maxHealth: number;
	public receiveDamage: boolean;
	public canDamage: boolean;

	protected constructor(spawnVector?: Vector)
	{
		this.game = Game.getInstance();

		this.size = new Vector(18, 18);
		this.spawnVector = spawnVector;
		this.position = Vector.copy(this.spawnVector);
		this.rectangle = new Rectangle(this.position.x, this.position.y, 
			this.size.x, this.size.y);
	}

	public abstract kill(): void;
	public abstract frame(): void;
}
