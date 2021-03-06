import Rectangle from "math/Rectangle";
import Condition from "utils/decorators/Condition";
import PixelType from "utils/PixelType";
import EntityAi from "ai/EntityAi";

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
		if (!this.isTriggered)
		{
			this.game.soundSystem.stopSound("super_mario_bros");
			this.game.soundSystem.playSound("flag");
		}
		this.isTriggered = true;

		// Go at the bottom of the flag
		if (!this.bottomFlag)
		{
			this.game.mario.canControl = false;
			this.game.mario.atlas.lock();
			this.game.mario.atlas.setSprite("flag", true);
			
			const predictedMove = Rectangle.copy(this.game.mario.rectangle);
			predictedMove.y += 1 + predictedMove.height;

			if (this.game.level.intersect(predictedMove, PixelType.FLAG))
				this.game.mario.position.y++;
			else
			{
				this.bottomFlag = true;
				this.game.soundSystem.playSound("stage_clear");
			}
		}
		// Walk to the end
		else if (this.bottomFlag && !this.done)
		{
			this.game.mario.atlas.unlock();
			this.game.mario.moveRight();
			this.done = true;
			alert("You finished the level!");
		}
	}
}
