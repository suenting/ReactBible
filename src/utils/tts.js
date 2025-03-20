class TTS {

    static voice = undefined;
    static locale = 'en-US';
    static continueSpeak = true;
    static currentVerse = undefined;
    static currentChaper = undefined;

    // this must be static as garbage collector may trigger preventing callback otherwise
    static speachSyntesisUtterance = new SpeechSynthesisUtterance();

    static fetchVoices() {
        // pre-fetch voices since they load async
        return window.speechSynthesis.getVoices() || [];
    }


    static getLocaleforVoice(language) {
        switch (language) {
            case 'EN':
                return 'en-US';
            case 'DE':
                return 'de-DE';                               
            case 'FR':
                return 'fr-FR';                
            case 'ES':
                return 'es-ES';                
            case 'IT':
                return 'it-IT';                  
            case 'ID':
                return 'id-ID';                                               
            case 'JP':
                return 'ja-JP';                
            case 'ZH':
                return 'zh-CN';
            default:
        }
    }

    static fetchVoicesForLanguage(language) {
        const allVoices = window.speechSynthesis.getVoices() || [];
        return allVoices.filter((voice)=>(voice.lang.toLowerCase().startsWith(language.toLowerCase())));
    }

    static setVoice(locale, preferedVoiceUri = undefined) {
        let voices = window.speechSynthesis.getVoices() || [];
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

        if(preferedVoiceUri) {
            const preferedVoice = findVoiceByURI(preferedVoiceUri);
            TTS.voice = preferedVoice;
            TTS.locale = preferedVoice.lang;
            return;
        }

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

    static showSpeakingIndicator = () => {
        const speakingIndicator = document.getElementById(`isSpeaking_${TTS.chapter}_${TTS.verse}`);
        if(speakingIndicator) {
            speakingIndicator.style.display = 'inline';
        }
    }

    static hideSpeakingIndicator = () => {
        const speakingIndicator = document.getElementById(`isSpeaking_${TTS.chapter}_${TTS.verse}`);
        if(speakingIndicator) {
            speakingIndicator.style.display = 'none';
        }
    }

    static speak(line, callback, chapter = undefined, verse = undefined) {
        let msg = TTS.speachSyntesisUtterance;
        TTS.continueSpeak = true;
        msg.text = line;
        msg.voice = TTS.voice;
        msg.lang = TTS.locale;
        TTS.chapter = chapter;
        TTS.verse = verse;
        TTS.showSpeakingIndicator();
        if (callback) {
            msg.onend = function (e) {
                TTS.hideSpeakingIndicator();
                if (!TTS.continueSpeak) {
                    TTS.chapter = undefined;
                    TTS.verse = undefined;
                    return;
                }
                callback();
            };
        }
        else {
            msg.onend = undefined;
        }
        if(window?.speechSynthesis?.speak) {
            console.log(msg);
            window.speechSynthesis.speak(msg);
        }
    }

    static cancel() {
        window.speechSynthesis.cancel();
        TTS.hideSpeakingIndicator();
        TTS.continueSpeak = false;
        TTS.chapter = undefined;
        TTS.verse = undefined;
    }

    static isSpeeaking() {
        return window.speechSynthesis.speaking;
    }

    static isSpeakingVerse(chapter, verse) {
        if (chapter === TTS.chapter && verse === TTS.verse && window.speechSynthesis.speaking) {
            return true;
        }
        return false;
    }
}
TTS.fetchVoices();
export default TTS;