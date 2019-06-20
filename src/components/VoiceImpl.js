/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

class VoiceImpl {
    static recognition;
    static speechRecognitionList;
    static callback;
    static _init() {
        this.callbacklist = [];
        this.recognition = new SpeechRecognition();
        this.recognition.onresult = (event)=>{
            this.callback(event.results[0][0].transcript);
        }
    }
    static start(cb) {
        this.callback = cb;
        this.recognition.start();
    }
}
VoiceImpl._init();
export default VoiceImpl;