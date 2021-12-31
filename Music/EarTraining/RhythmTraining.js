const metronomeSampler = new Tone.Sampler({
    release: 1,
    baseUrl: "https://matheweon.github.io/Music/EarTraining/MetronomeClick.wav",
}).toDestination();

function rhythmStart() {
    Tone.loaded().then(() => {
        metronomeSampler.triggerAttackRelease();
    });
}