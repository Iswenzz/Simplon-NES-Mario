import Rectangle from "../../math/Rectangle";
import Condition from "../../utils/decorators/Condition";
import PixelType from "../../utils/PixelType";
import EntityAi from "../EntityAi";

export default class EndFlag extends EntityAi
{
	public bottomFlag = false;
	public done = false;

	public constructor()
	{
		super();
	}

	@Condition({
		property: ["isTriggered", true],
		intersect: true
	})
	public trigger()
	{
		this.isTriggered = true;
		this.game.mario.canControl = false;
		const predictedMove = Rectangle.copy(this.game.mario.rectangle);

		// Go at the bottom of the flag
		if (!this.bottomFlag)
		{
			predictedMove.y += 1 + predictedMove.height;
			if (this.game.level.intersect(predictedMove, PixelType.FLAG))
				this.game.mario.position.y++;
			else
				this.bottomFlag = true;
		}
		// Walk to the end
		else if (this.bottomFlag && !this.done)
		{
			this.game.mario.moveRight();
			this.done = true;
			alert("You finished the level!");
		}
	}
}
