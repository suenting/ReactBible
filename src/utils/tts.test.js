import TTS from "./tts";


describe("tts class tests", () => {

    it('can set voice by uri',()=>{
        TTS.setVoice('DE');
        TTS.setVoice('FR');
        TTS.setVoice('ES');
        TTS.setVoice('IT');
        TTS.setVoice('ID');
        TTS.setVoice('JP');
        TTS.setVoice('ZH');
    });

    it('can call cancel',()=>{
        TTS.cancel();
    });    
});