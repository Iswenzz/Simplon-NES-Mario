import Mario from "./ai/Mario";
import Level from "./world/Level";
import Vector from "./math/Vector";
import Canvas from "./sys/Canvas";
import Controls from "./sys/Controls";
import lvl1 from "./assets/level/1-1.jpg";

export default class Game
{
	private static instance: Game;

	public canvas: Canvas;
	public controls: Controls;

	public level: Level;
	public mario: Mario;

	private constructor() { }

	public initialize()
	{
		this.canvas = new Canvas("game");
		this.canvas.initialize();
		this.controls = new Controls();

		this.level = new Level(lvl1);
		this.mario = new Mario(new Vector(130, 190));

		window.requestAnimationFrame(this.mainLoop.bind(this));
	}

	public static getInstance()
	{
		if (!Game.instance)
			Game.instance = new Game();
		return Game.instance;
	}
	
	private mainLoop()
	{
		this.canvas.clear();
		this.level.frame();
		this.mario.frame();

		window.requestAnimationFrame(this.mainLoop.bind(this));
	}
}
