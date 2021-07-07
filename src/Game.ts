import Mario from "./ai/Mario";
import Level from "./world/Level";
import Vector from "./math/Vector";
import Canvas from "./sys/Canvas";
import Controls from "./sys/Controls";
import ImageFactory from "./graphics/ImageFactory";
import * as Stats from "stats.js";

import lvl1 from "./assets/1-1.jpg";
import lvl1_col from "./assets/1-1_col.jpg";
import mario from "./assets/mario_atlas.png";

export default class Game
{
	private static instance: Game;
	public stats: Stats;

	public canvas: Canvas;
	public controls: Controls;
	public imageFactory: ImageFactory;

	public level: Level;
	public mario: Mario;

	private constructor() 
	{
		this.imageFactory = new ImageFactory();
		this.imageFactory.registerImage("1-1", lvl1);
		this.imageFactory.registerImage("1-1_col", lvl1_col);
		this.imageFactory.registerImage("mario", mario);
		this.load();
		this.profile();
	}

	public profile()
	{
		this.stats = new Stats();
		this.stats.showPanel(0);
		document.body.appendChild(this.stats.dom);
	}

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

	public initialize()
	{
		this.canvas = new Canvas("game");
		this.canvas.initialize();
		this.controls = new Controls();

		this.level = new Level(
			this.imageFactory.getImage("1-1"),
			this.imageFactory.getImage("1-1_col"));
		this.mario = new Mario(new Vector(200, 190));

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
		this.stats.begin();

		this.canvas.clear();
		this.level.frame();
		this.mario.frame();

		this.stats.end();
		window.requestAnimationFrame(this.mainLoop.bind(this));
	}
}
