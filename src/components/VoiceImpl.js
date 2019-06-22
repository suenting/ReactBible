/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */

var SpeechRecognition = null;
var SpeechGrammarList = null;
var SpeechRecognitionEvent = null;
try{
    SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
}catch(err){
    // ignore
}
class VoiceImpl {
    static recognition;
    static speechRecognitionList;
    static callback;
    static isSupported(){
        return SpeechRecognition!==null;
    }
    static _init() {
        if(VoiceImpl.isSupported()){
            this.callbacklist = [];
            this.recognition = new SpeechRecognition();
            this.recognition.onresult = (event)=>{
                this.callback(event.results[0][0].transcript);
            }
        }
    }
    static start(cb) {
        this.callback = cb;
        this.recognition.start();
    }
}
VoiceImpl._init();
export default VoiceImpl;