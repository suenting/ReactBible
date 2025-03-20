import React from 'react'
import { connect } from 'react-redux'
import {findBook} from '../utils/common'
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import './Verse.css';
import TTS from '../utils/tts'

const Verse = (props) => {
    const { idx, chapter, book, text, voice, voicePref, audio, tooltip, bibles } = props;
    const getBibleFromLocale = function(locale){
        switch(locale){
            case 'EN':
                return bibles.EN;
            case 'ZH':
                return bibles.ZH;
            case 'EL':
                return bibles.EL;
            case 'DE':
                return bibles.DE;
            case 'FR':
                return bibles.FR;
            case 'ES':
                return bibles.ES;
            default:
                return null;
        }
    };
    let textBible = getBibleFromLocale(text);
    let voiceBible = getBibleFromLocale(voice);
    let tooltipBible = getBibleFromLocale(tooltip);
    let textBook = findBook(textBible, book);
    let voiceBook = findBook(voiceBible, book);
    let tooltipBook = findBook(tooltipBible, book);

    const getChapter = function(book){
        return book.chapters[chapter];
    }
    const htmlDecode = function(input){
        const doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
    }        
    const getVerse = function(book, verse){
        if(!book){
            return "";
        }
        return htmlDecode(book.chapters[chapter][verse]);
    }

    const chapterInt = parseInt(chapter,10);
    const verse = parseInt(idx,10);

    const speakVerse = function(voice, audio, idx, voiceChapter){
        if(!audio)
        {
            return;
        }
        if(TTS.isSpeeaking()){
            TTS.cancel();
            return;
        }
        TTS.setVoice(voice, voicePref);
        let line = getVerse(voiceBook,idx);
        if(idx+1<voiceChapter.length){
            let callback = speakVerse.bind(this,voice, audio,idx+1,voiceChapter);
            TTS.speak(line, callback, chapterInt, idx);
        }
        else{
            TTS.speak(line, undefined, chapterInt, idx);
        }
    }

    let renderText = "";
    let renderTooltip = "";

    renderText = getVerse(textBook, verse);
    renderTooltip = getVerse(tooltipBook, verse);

    const RenderIsSpeaking = () => {
        return <span style={{display: "none"}} id={`isSpeaking_${chapterInt}_${verse}`}><VolumeUpIcon /></span>
    }

    if('NA' === tooltip)
    {
        return (
            <div className="Verse" onClick={() => speakVerse(voice, audio, idx, getChapter(voiceBook))}><RenderIsSpeaking />({chapterInt+1},{verse+1}) {renderText}</div>
        )
    }
    return (
        <div className="VerseTooltip" onClick={() => speakVerse(voice, audio, idx, getChapter(voiceBook))}> 
            <RenderIsSpeaking />({chapterInt+1},{verse+1}) {renderText}
            <span className="tooltiptext">({chapterInt+1},{verse+1}) {renderTooltip}</span>
        </div>
    )
}

function mapStateToProps(state) {
    return {
            chapter: state.ReactBibleReducer.chapter,
            book: state.ReactBibleReducer.book,
            text: state.ReactBibleReducer.text_locale,
            tooltip: state.ReactBibleReducer.tooltip_locale,
            audio: state.ReactBibleReducer.audio,
            voicePref: state.ReactBibleReducer.voice_pref_uri,
            voice: state.ReactBibleReducer.voice_locale};
}
export default connect(mapStateToProps)(Verse)