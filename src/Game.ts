import * as Stats from "stats.js";
import Mario from "ai/characters/Mario";
import Level from "world/Level";
import Canvas from "sys/Canvas";
import Controls from "sys/Controls";
import ImageFactory from "graphics/ImageFactory";
import Action from "utils/Action";

// @todo - Dynamic assets loading
import L1_1 from "world/level/1-1";
import lvl1 from "assets/1-1.jpg";
import lvl1_col from "assets/1-1_col.png";
import mario from "assets/mario_atlas.png";

export default class Game
{
	private static instance: Game;
	public stats: Stats;

	public canvas: Canvas;
	public controls: Controls;
	public imageFactory: ImageFactory;

	public level: Level;
	public mario: Mario;

	public frames = 0;
	public fps = 0;
	public time = 0;
	public previousTime = 0;
	public deltaTime = 0;

	private constructor() 
	{
		this.imageFactory = new ImageFactory();
		this.imageFactory.registerImage("1-1", lvl1);
		this.imageFactory.registerImage("1-1_col", lvl1_col);
		this.imageFactory.registerImage("mario", mario);

		this.load();
		this.profile();
	}

	/**
	 * Initialize the canvas profiler with stats.js
	 */
	public profile()
	{
		this.stats = new Stats();
		this.stats.showPanel(0);
		document.body.appendChild(this.stats.dom);
	}

	/**
	 * Load all assets before starting the game.
	 */
	public load()
	{
		const loadImages = setInterval(() => 
		{
			if (this.imageFactory.isAllLoaded())
			{
				this.initialize();
				clearInterval(loadImages);
			}
		}, 100);
	}

	/**
	 * Initialize the game.
	 * @todo - Game configuration
	 * @todo - Game save
	 */
	public initialize()
	{
		this.canvas = new Canvas("game");
		this.canvas.initialize();
		this.controls = new Controls();

		this.level = new L1_1();
		this.mario = new Mario(this.level.spawnPoint);

		window.requestAnimationFrame(this.mainLoop.bind(this));
	}

	public gameOver()
	{
		console.log("game over");
	}

	public static getInstance()
	{
		if (!Game.instance)
			Game.instance = new Game();
		return Game.instance;
	}

	private mainLoop(currentTime: number)
	{
		this.stats.begin();
		this.canvas.clear();

		// Clock
		this.deltaTime = (currentTime - this.previousTime) / 1000;
		this.fps = Math.round(1 / this.deltaTime);
		this.time += Math.round(this.deltaTime * 1000);
		this.previousTime = currentTime;
		this.frames++;

		// Game
		this.level.frame();
		this.mario.frame();

		// Triggers
		Action.callback(this.mario.health <= 0, this.level.respawn.bind(this.level));
		Action.callback(this.mario.life <= 0, this.gameOver.bind(this));

		this.stats.end();
		window.requestAnimationFrame(this.mainLoop.bind(this));
	}
}
