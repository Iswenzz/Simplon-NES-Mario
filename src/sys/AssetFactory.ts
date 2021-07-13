import Texture from "graphics/Texture";
import Sound from "./Sound";

export default class AssetFactory
{
	public images: Record<string, Texture> = {};
	public sounds: Record<string, Sound> = {};

	public registerImage(name: string, imagePath: string)
	{
		const image = new Image();
		image.src = imagePath;
		this.images[name] = new Texture(name, image);
		image.onload = () => this.images[name].loaded = true;
	}

	public getImage(name: string): Texture
	{
		return this.images[name];
	}

	public getSound(name: string): Sound
	{
		return this.sounds[name];
	}

	public isAllLoaded()
	{
		return Object.keys(this.images).every(k => this.images[k].loaded) &&
			Object.keys(this.sounds).every(k => this.sounds[k].loaded);
	}
}
