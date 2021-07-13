export default class Asset<T>
{
	public name: string;
	public data?: T;
	public loaded: boolean;

	public constructor(name: string, data?: T, loaded?: boolean)
	{
		this.name = name;
		this.data = data;
		this.loaded = loaded ?? false;
	}
}
