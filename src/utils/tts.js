class TTS {

    static voice = undefined;
    static locale = 'en-US';
    static continueSpeak = true;

    // this must be static as garbage collector may trigger preventing callback otherwise
    static speachSyntesisUtterance = new SpeechSynthesisUtterance();

    static fetchVoices() {
        // pre-fetch voices since they load async
        window.speechSynthesis.getVoices();
    }

    static setVoice(locale) {
        let voices = window.speechSynthesis.getVoices();
        /*
        0: Microsoft David Desktop - English (United States)
        1: Microsoft Zira Desktop - English (United States)
        2: Google Deutsch
        3: Google US English
        4: Google UK English Female
        5: Google UK English Male
        6: Google español
        7: Google español de Estados Unidos
        8: Google français
        9: Google हिन्दी
        10: Google Bahasa Indonesia
        11: Google italiano
        12: Google 日本語
        13: Google 한국의
        14: Google Nederlands
        15: Google polski
        16: Google português do Brasil
        17: Google русский
        18: Google 普通话（中国大陆）
        19: Google 粤語（香港）
        20: Google 國語（臺灣）
        */
        let findVoiceByURI = function (voiceURI) {
            for(let it = 0; it<voices.length; ++it){
                if(voices[it].voiceURI === voiceURI){
                    return voices[it];
                }
            }
            return null;
        };
        let findVoiceByLang = function (voiceLang) {
            for(let it = 0; it<voices.length; ++it){
                if(voices[it].lang === voiceLang){
                    return voices[it];
                }
            }
            return null;
        };

        switch (locale) {
            case 'EN':
                TTS.voice = findVoiceByURI("Google UK English Female");
                TTS.locale = 'en-US';
                break;
            case 'DE':
                TTS.voice = findVoiceByLang("de-DE");
                TTS.locale = 'de-DE';                
                break;                
            case 'FR':
                TTS.voice = findVoiceByLang("fr-FR");
                TTS.locale = 'fr-FR';                
                break;
            case 'ES':
                TTS.voice = findVoiceByLang("es-ES");
                TTS.locale = 'es-ES';                
                break;
            case 'IT':
                TTS.voice = findVoiceByLang("it-IT");
                TTS.locale = 'it-IT';                
                break;   
            case 'ID':
                TTS.voice = findVoiceByLang("id-ID");
                TTS.locale = 'id-ID';                
                break;                                
            case 'JP':
                TTS.voice = findVoiceByLang("ja-JP");
                TTS.locale = 'ja-JP';                
                break;
            case 'ZH':
                TTS.voice = findVoiceByLang("zh-CN");
                TTS.locale = 'zh-CN';
                break;
            default:
                break;
        }
    }

    static speak(line, callback) {
        let msg = TTS.speachSyntesisUtterance;
        TTS.continueSpeak = true;
        msg.text = line;
        msg.voice = TTS.voice;
        msg.lang = TTS.locale;
        if (callback) {
            msg.onend = function (e) {
                if (!TTS.continueSpeak) {
                    return;
                }
                callback();
            };
        }
        else {
            msg.onend = undefined;
        }
        window.speechSynthesis.speak(msg);
    }

    static cancel() {
        window.speechSynthesis.cancel();
        TTS.continueSpeak = false;
    }

    static isSpeeaking() {
        return window.speechSynthesis.speaking;
    }
}
TTS.fetchVoices();
export default TTS;