import Game from "Game";
import EndFlag from "ai/entities/EndFlag";
import Vector from "math/Vector";
import Level from "world/Level";

export default class L1_1 extends Level 
{
	public endFlag: EndFlag;

	public constructor()
	{
		const { assetFactory } = Game.getInstance();

		super(assetFactory.getImage("1-1"), assetFactory.getImage("1-1_col"));
		this.spawnPoint = new Vector(200, 188);
		this.endFlag = new EndFlag();
	}
}
