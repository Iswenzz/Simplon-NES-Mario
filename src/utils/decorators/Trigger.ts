import GeneralAi from "../../ai/GeneralAI";
import Game from "../../Game";
import PixelType from "../PixelType";

const Trigger = (pixelType: PixelType) => 
{
	return (target: any, key: string, descriptor: PropertyDescriptor) => 
	{
		const method = descriptor.value;
		descriptor.value = function (...args: any) 
		{
			const { level } = Game.getInstance();
			const instance = this;

			if (instance instanceof GeneralAi && level.intersect(instance.rectangle, pixelType))
				method.apply(instance, args);
		};
	};
};

export default Trigger;