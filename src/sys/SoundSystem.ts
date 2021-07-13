import AssetFactory from "./AssetFactory";
import Sound from "./Sound";

export default class SoundSystem
{
	private assetFactory: AssetFactory;
	public context: AudioContext;
	public queue: Record<string, AudioBufferSourceNode> = {};

	public constructor(assetFactory: AssetFactory)
	{
		this.assetFactory = assetFactory;
		this.context = new AudioContext();
	}

	public registerSound(name: string, soundPath: string)
	{
		this.assetFactory.sounds[name] = new Sound(name);

		fetch(soundPath).then(res => res.arrayBuffer())
			.then(buffer => this.context.decodeAudioData(buffer))
			.then(audioBuffer => this.assetFactory.sounds[name] = new Sound(name, audioBuffer, true));
	}

	public playSound(name: string)
	{
		const bufferSource = this.context.createBufferSource();
		this.queue[name] = bufferSource;

		bufferSource.buffer = this.assetFactory.sounds[name].data;
		bufferSource.connect(this.context.destination);
		bufferSource.start();
	}

	public stopSound(name: string)
	{
		this.queue[name].stop();
	}
}
