import Canvas from "./sys/Canvas";
import Level from "./world/Level";
import lvl1 from "./assets/level/1-1.jpg";
import "./style.css";

const canvas = new Canvas("game");
const level = new Level(canvas, lvl1);
canvas.clear();

const mainLoop = () =>
{
	level.frame();
	window.requestAnimationFrame(mainLoop);
}
window.requestAnimationFrame(mainLoop)
