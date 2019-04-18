class TTS {
    
    static voice = undefined;
    static locale = 'en-US';
    static continueSpeak = true;

    // this must be static as garbage collector may trigger preventing callback otherwise
    static speachSyntesisUtterance = new SpeechSynthesisUtterance();

    static fetchVoices(){
        // pre-fetch voices since they load async
        window.speechSynthesis.getVoices();
    }

    static setVoice(locale){
        let voices = window.speechSynthesis.getVoices();
        switch(locale)
        {
            case 'EN':
                TTS.voice = voices[4];
                TTS.locale = 'en-US';
            break;
            case 'ZH':
                TTS.voice = voices[18];
                TTS.locale = 'zh-CN';
            break;
            default:
            break;
        }
    }

    static speak(line, callback){
        let msg = TTS.speachSyntesisUtterance;
        TTS.continueSpeak = true;
        msg.text = line;
        msg.voice = TTS.voice;
        msg.lang = TTS.locale;
        if(callback){
            msg.onend = function(e) {
                if(!TTS.continueSpeak){
                    return;
                }
                callback();
            };
        }
        else{
            msg.onend = undefined;
        }
        window.speechSynthesis.speak(msg);
    }

    static cancel(){
        window.speechSynthesis.cancel();
        TTS.continueSpeak = false;
    }

    static isSpeeaking(){
        return window.speechSynthesis.speaking;
    }
}
export default TTS;