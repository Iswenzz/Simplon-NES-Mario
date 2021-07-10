import AbstractAi from "../../ai/AbstractAi";
import Game from "../../Game";
import PixelType from "../PixelType";

export type ConditionComposition<T> = {
	property?: [string, T]
	keydown?: string,
	keyup?: string,
	trigger?: PixelType,
	logic?: "and" | "or"
};

const Condition = <T>(composition: ConditionComposition<T>) => 
{
	return (target: any, key: string, descriptor: PropertyDescriptor) => 
	{
		const method = descriptor.value;
		descriptor.value = function (...args: any) 
		{
			const { controls, level } = Game.getInstance();
			const instance = this;

			const boolStack = [];
			let valid = false;

			// Checks
			if (instance instanceof AbstractAi && instance.isDead) return;
			if (composition.property) boolStack.push(instance[composition.property[0]] === composition.property[1]);
			if (composition.keydown) boolStack.push(controls.keysDown[composition.keydown]);
			if (composition.keyup) boolStack.push(controls.keysUp[composition.keyup]);
			if (composition.trigger) boolStack.push(level.intersect(instance.rectangle, composition.trigger));

			// Logic
			valid = (composition.logic ?? "or") === "and" ? 
				boolStack.every(b => b) : boolStack.some(b => b);
			if (valid)
				method.apply(instance, args);
		};
	};
};

export default Condition;