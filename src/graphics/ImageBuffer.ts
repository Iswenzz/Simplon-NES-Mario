import Vector from "../math/Vector";
import Texture from "./Texture";

export default class ImageBuffer
{
	public bitmap: HTMLImageElement;
	public buffer: ImageData;

	public constructor(texture: Texture)
	{
		this.bitmap = texture.bitmap;
		this.buffer = this.getImageBuffer(texture);
	}

	public colorAt(x: number, y: number)
	{
		const pixelOffset = (y * this.buffer.width + x) * 4;
		return {
			r: this.buffer.data[pixelOffset],
			g: this.buffer.data[pixelOffset + 1],
			b: this.buffer.data[pixelOffset + 2],
			a: this.buffer.data[pixelOffset + 3],
		};
	}

	public getImageBuffer(texture: Texture): ImageData
	{
		const canvas = document.createElement("canvas");
		canvas.width = texture.bitmap.width;
		canvas.height = texture.bitmap.height;

		const ctx = canvas.getContext("2d");
		ctx.drawImage(texture.bitmap, 0, 0, 
			texture.bitmap.width, texture.bitmap.height);

		return ctx.getImageData(0, 0, canvas.width, canvas.height);
	}
}
