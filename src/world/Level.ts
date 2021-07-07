import Canvas from "../sys/Canvas";
import IRenderable from "../IRenderable";
import Game from "../Game";
import Vector from "../math/Vector";
import Texture from "../graphics/Texture";
import ImageBuffer from "../graphics/ImageBuffer";
import Rectangle, { Corners } from "../math/Rectangle";

export default class Level implements IRenderable
{
	private canvas: Canvas;

	public bitmap: HTMLImageElement;
	public colmap: ImageBuffer;
	public originalPosition: Vector;
	public position: Vector;
	public size: Vector;

	public constructor(texture: Texture, colmap: Texture, topLeftVector?: Vector)
	{
		const { canvas } = Game.getInstance();

		this.canvas = canvas;
		this.bitmap = texture.bitmap;
		this.colmap = new ImageBuffer(colmap);

		this.originalPosition = Vector.copy(topLeftVector);
		this.position = Vector.copy(this.originalPosition);
		this.size = new Vector(this.bitmap.width, this.bitmap.height);
	} 

	public intersect(rectangle: Rectangle, ...selectedCorners: (keyof Corners)[]): boolean
	{
		const corners = {
			topLeft: this.colmap.colorAt(rectangle.getTopLeft()),
			bottomRight: this.colmap.colorAt(rectangle.getBottomRight()),
			topRight: this.colmap.colorAt(rectangle.getTopRight()),
			bottomLeft: this.colmap.colorAt(rectangle.getBottomLeft()),
		};
		// selectedCorners.forEach(k => console.log(k, corners[k]));

		return selectedCorners.some(k => corners[k].r === 0);
	}

	public frame()
	{
		this.canvas.render(this.bitmap, this.position, this.size);
	}
}
