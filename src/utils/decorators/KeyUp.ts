import Condition from "./Condition";

const KeyUp = (keyName: string) => Condition({
	keyup: keyName
});

export default KeyUp;