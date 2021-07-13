import Vector from "math/Vector";
import Texture from "./Texture";

export type Color = {
	r: number,
	g: number,
	b: number,
	a: number
};

export default class ImageBuffer
{
	public bitmap: HTMLImageElement;
	public buffer: ImageData;

	public constructor(texture: Texture)
	{
		this.bitmap = texture.data;
		this.buffer = this.getImageBuffer(texture);
	}

	public colorAt(point: Vector): Color
	{
		const pixelOffset = Math.round(Math.round(point.y) * this.buffer.width + Math.round(point.x)) * 4;
		return {
			r: this.buffer.data[pixelOffset],
			g: this.buffer.data[pixelOffset + 1],
			b: this.buffer.data[pixelOffset + 2],
			a: this.buffer.data[pixelOffset + 3]
		};
	}

	public getImageBuffer(texture: Texture): ImageData
	{
		const canvas = document.createElement("canvas");
		canvas.width = texture.data.width;
		canvas.height = texture.data.height;

		const ctx = canvas.getContext("2d");
		ctx.drawImage(texture.data, 0, 0, 
			texture.data.width, texture.data.height);

		return ctx.getImageData(0, 0, canvas.width, canvas.height);
	}
}
