export default class Controls
{
	public keysUp: Record<string, boolean> = {};
	public keysDown: Record<string, boolean> = {};

	public constructor()
	{
		document.addEventListener("keydown", this.onKeyDown.bind(this));
		document.addEventListener("keyup", this.onKeyUp.bind(this));
	}

	private onKeyDown(e: KeyboardEvent)
	{
		this.keysDown[e.key] = true;
		this.keysUp[e.key] = false;
	}

	private onKeyUp(e: KeyboardEvent)
	{
		this.keysUp[e.key] = true;
		this.keysDown[e.key] = false;
	}

	public dispose()
	{
		document.removeEventListener("keydown", this.onKeyDown.bind(this));
		document.removeEventListener("keyup", this.onKeyUp.bind(this));
	}
}
