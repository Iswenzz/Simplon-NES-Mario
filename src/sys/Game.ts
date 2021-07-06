import Mario from "../ai/Mario";
import Level from "../world/Level";
import Canvas from "./Canvas";
import lvl1 from "../assets/level/1-1.jpg";
import Controls from "./Controls";
import Camera from "./Camera";

export default class Game
{
	private static instance: Game = new Game();

	public canvas: Canvas;
	public controls: Controls;
	public camera: Camera;

	public level: Level;
	public mario: Mario;

	private constructor() { }

	public initialize()
	{
		this.canvas = new Canvas("game");
		this.controls = new Controls();
		this.camera = new Camera();

		this.level = new Level(lvl1);
		this.mario = new Mario({ x: 300, y: 465 });

		window.requestAnimationFrame(this.mainLoop.bind(this));
	}

	public static getInstance()
	{
		if (Game.instance === null)
			Game.instance = new Game();
		return Game.instance;
	}
	
	private mainLoop()
	{
		this.level.frame();
		this.mario.frame();

		window.requestAnimationFrame(this.mainLoop.bind(this));
	}
}
