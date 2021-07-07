import Texture from "./Texture";

export default class ImageFactory
{
	public images: Record<string, Texture> = {}; 

	public registerImage(name: string, imagePath: string)
	{
		const image = new Image();
		image.src = imagePath;
		this.images[name] = new Texture(name, image, false);
		image.onload = () => this.images[name].loaded = true;
	}

	public getImage(name: string): Texture
	{
		return this.images[name];
	}

	public isAllLoaded()
	{
		return Object.keys(this.images).every(k => this.images[k].loaded);
	}
}
