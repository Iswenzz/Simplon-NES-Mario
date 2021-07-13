import Vector from "math/Vector";
import Condition from "utils/decorators/Condition";
import AbstractAi from "./AbstractAi";

export default class EntityAi extends AbstractAi
{
	public isTriggered = false;

	public constructor(spawnPoint?: Vector)
	{
		super(spawnPoint);
	}

	@Condition({
		property: ["isTriggered", true],
		intersect: true
	})
	public trigger()
	{
		this.isTriggered = true;
		this.kill();
	}

	public frame()
	{
		// Events
		this.trigger();

		// Render
		super.frame();
	}
}
