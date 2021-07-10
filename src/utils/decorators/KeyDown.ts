import Condition from "./Condition";

const KeyDown = (keyName: string) => Condition({
	keydown: keyName
});

export default KeyDown;