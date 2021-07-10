export default class Action
{
	private static noop = () => { };

	public static callback = (condition: boolean, 
		trueCallback: () => void = Action.noop, 
		falseCallback: () => void = Action.noop) =>
	{
		condition ? trueCallback() : falseCallback();
		return condition;
	};
}
