import Game from "../Game";
import IRenderable from "../IRenderable";
import AtlasImage from "./AtlasImage";
import Texture from "./Texture";

export default class Animation implements IRenderable
{
	private game: Game;

	public atlas: AtlasImage;
	public name: string;
	public count: number;

	public interval = 1;
	public animationIds: string[];

	public constructor(atlas: AtlasImage, animName: string, atlasCount: number)
	{
		this.game = Game.getInstance();

		this.atlas = atlas;
		this.name = animName;
		this.count = atlasCount;

		this.animationIds = new Array(this.count).fill(null)
			.map((_, i: number) => `${this.name}${i}`);
	}

	public setInterval(interval: number)
	{
		this.interval = interval;
	}

	public frame()
	{
		if (this.game.time % this.interval === 0)
		{
			// Rotate the ids
			this.animationIds.push(...this.animationIds.splice(0, 1));
			console.log(this.animationIds);
		}
		this.atlas.setSprite(this.animationIds[0]);
	}
}
