var chatPings = (function() {
  var c = new AudioContext();
  var channels = {};
  // Minor pentatonic
  var availableTones = [233.08, 261.63, 311.13, 349.23, 392, 466.16, 523.25, 622.25, 698.46, 783.99, 923.33, 1046.50];

  var createNamedChannels = function(newChannels) {
    newChannels.forEach(function(channel){
      var osc = c.createOscillator();
      osc.frequency.value = availableTones.shift();
      var gainNode = c.createGain();
      gainNode.gain.value = 0;
      osc.connect(gainNode);
      gainNode.connect(c.destination);
      osc.start();
      channels[channel] = {
        osc: osc,
        gain: gainNode
      };
    });
  };

  var resetChannels = function() {
    channels = {};
  };

  var playSound = function(id) {
    if(!channels.hasOwnProperty(id)) {
      throw new Error("Cannot find id: " + id +". Maybe you meant one of these? " + Object.keys(channels).join(","));
    }
    var now = c.currentTime;
    var gainNode = channels[id].gain;
    gainNode.gain.linearRampToValueAtTime(0.8, now + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
  };

  return {
    createNamedChannels: createNamedChannels,
    resetChannels: resetChannels,
    playSound: playSound
  };

}());
