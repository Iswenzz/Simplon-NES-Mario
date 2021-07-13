import Rectangle from "math/Rectangle";
import Texture from "./Texture";

export default class AtlasImage
{
	public bitmap: HTMLImageElement;
	public sprites: Record<string, Texture> = {};
	public loaded: boolean;
	public json: Record<string, Rectangle>;
	public currentAtlas: Texture;
	public lockSprite: boolean;

	public constructor(texture: Texture, json?: Record<string, Rectangle>)
	{
		this.bitmap = texture.bitmap;
		this.json = json;
		this.registerSpriteFromConfig(this.json);
		this.currentAtlas = new Texture(null, null, false);
	}

	public registerSpriteFromConfig(json: Record<string, Rectangle>)
	{
		Object.keys(json).forEach(k =>
		{
			const { x, y, width, height } = this.json[k];
			this.registerSprite(k, new Rectangle(x, y, width, height));
		});
	}

	public registerSprite(name: string, rect: Rectangle)
	{
		const cropCanvas = document.createElement("canvas");
		cropCanvas.width = rect.width;
		cropCanvas.height = rect.height;
		const ctx = cropCanvas.getContext("2d");
		
		this.sprites[name] = new Texture(name, null, false);
		ctx.drawImage(this.bitmap, rect.x, rect.y, rect.width, rect.height,
			0, 0, rect.width, rect.height);

		const sprite = new Image();
		sprite.src = cropCanvas.toDataURL();
		this.sprites[name].bitmap = sprite;
		this.sprites[name].loaded = true;
	}

	public getSprite(name: string): Texture
	{
		return this.sprites[name];
	}

	public setSprite(name: string, force?: boolean)
	{
		if (!this.lockSprite || force)
			this.currentAtlas = this.sprites[name];
	}

	public lock()
	{
		this.lockSprite = true;
	}

	public unlock()
	{
		this.lockSprite = false;
	}
}
