import * as Stats from "stats.js";
import AbstractAi from "ai/AbstractAi";
import Mario from "ai/characters/Mario";
import Level from "world/Level";
import Canvas from "sys/Canvas";
import Controls from "sys/Controls";
import SoundSystem from "sys/SoundSystem";
import AssetFactory from "sys/AssetFactory";
import Action from "utils/Action";

// @todo - Dynamic assets loading
import L1_1 from "world/level/1-1";
import lvl1 from "assets/world/1-1/1-1.jpg";
import lvl1_col from "assets/world/1-1/1-1_col.png";
import mario from "assets/ai/characters/mario/mario_atlas.png";
import super_mario_bros from "assets/music/super_mario_bros.mp3";
import mario_die from "assets/ai/characters/mario/smb_mariodie.wav";
import mario_jump from "assets/ai/characters/mario/smb_jump-small.wav";
import bump from "assets/ai/characters/mario/smb_bump.wav";
import flag from "assets/ai/entities/flag/smb_flagpole.wav";
import game_over from "assets/game/smb_gameover.wav";
import stage_clear from "assets/game/smb_stage_clear.wav";

export default class Game
{
	private static instance: Game;
	public stats: Stats;

	public canvas: Canvas;
	public controls: Controls;
	public assetFactory: AssetFactory;
	public soundSystem: SoundSystem;

	public level: Level;
	public mario: Mario;
	public entities: AbstractAi[];

	public frames = 0;
	public fps = 0;
	public time = 0;
	public previousTime = 0;
	public deltaTime = 0;

	private constructor() 
	{
		this.assetFactory = new AssetFactory();
		this.assetFactory.registerImage("1-1", lvl1);
		this.assetFactory.registerImage("1-1_col", lvl1_col);
		this.assetFactory.registerImage("mario", mario);

		this.soundSystem = new SoundSystem(this.assetFactory);
		this.soundSystem.registerSound("super_mario_bros", super_mario_bros);
		this.soundSystem.registerSound("mario_die", mario_die);
		this.soundSystem.registerSound("mario_jump", mario_jump);
		this.soundSystem.registerSound("bump", bump);
		this.soundSystem.registerSound("flag", flag);
		this.soundSystem.registerSound("game_over", game_over);
		this.soundSystem.registerSound("stage_clear", stage_clear);

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
			if (this.assetFactory.isAllLoaded())
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

		this.entities = [];
		this.level = new L1_1();
		this.mario = new Mario(this.level.spawnPoint);

		this.soundSystem.playSound("super_mario_bros");

		window.requestAnimationFrame(this.mainLoop.bind(this));
	}

	public gameOver()
	{
		this.soundSystem.stopSound("super_mario_bros");
		this.soundSystem.playSound("game_over");
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
		const delta = (currentTime - this.previousTime) / 1000;
		this.deltaTime = delta > 0.03 ? 0.03 : delta;
		this.fps = Math.round(1 / this.deltaTime);
		this.time += Math.round(this.deltaTime * 1000);
		this.previousTime = currentTime;
		this.frames++;

		// Game
		this.level.frame();
		this.entities.forEach(e => e.frame());

		// Triggers
		Action.callback(this.mario.health <= 0, this.level.respawn.bind(this.level));
		Action.callback(this.mario.life <= 0, this.gameOver.bind(this));

		this.stats.end();
		window.requestAnimationFrame(this.mainLoop.bind(this));
	}
}
