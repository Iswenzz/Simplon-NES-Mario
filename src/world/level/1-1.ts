import Game from "../../Game";
import Vector from "../../math/Vector";
import Level from "../Level";

export default class L1_1 extends Level 
{
	public constructor()
	{
		const { imageFactory } = Game.getInstance();

		super(imageFactory.getImage("1-1"), imageFactory.getImage("1-1_col"));
		this.spawnPoint = new Vector(200, 180);
	}
}
