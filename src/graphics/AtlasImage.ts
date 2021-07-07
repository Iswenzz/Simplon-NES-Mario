import Rectangle from "../math/Rectangle";
import Texture from "./Texture";

export default class AtlasImage
{
	public bitmap: HTMLImageElement;
	public sprites: Record<string, Texture> = {};
	public loaded: boolean;

	public constructor(texture: Texture)
	{
		this.bitmap = texture.bitmap;
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
}
