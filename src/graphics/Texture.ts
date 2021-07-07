export default class Texture
{
	public name: string;
	public bitmap: HTMLImageElement;
	public loaded: boolean;

	public constructor(name: string, bitmap: HTMLImageElement, loaded: boolean)
	{
		this.name = name;
		this.bitmap = bitmap;
		this.loaded = loaded;
	}
}
