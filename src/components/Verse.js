import React, { Component } from 'react'
import { connect } from 'react-redux'
import {findBook} from '../utils/common'
import './Verse.css';
import TTS from '../utils/tts'

class Verse extends Component {

    constructor(props){
        super(props);
        this.state = {
            enBible: props.enBible,
            zhBible: props.zhBible
        }
    }

    render() {
        let htmlDecode = function(input){
            var doc = new DOMParser().parseFromString(input, "text/html");
            return doc.documentElement.textContent;
        }
        let getLocaleText = function(locale, verseDisplay){
            switch(locale)
            {
                case 'EN':
                   return htmlDecode(enCurrentChapter[verseDisplay-1]);
                case 'ZH':
                   return zhCurrentChapter[verseDisplay-1];
                default:
                    return '';
            }            
        }        
        let speakVerse = function(voice, audio, idx, voiceChapter){
            if(!audio)
            {
                return;
            }
            if(TTS.isSpeeaking()){
                TTS.cancel();
                return;
            }
            TTS.setVoice(voice);
            let line = getLocaleText(voice,idx+1);
            if(idx+1<voiceChapter.length){
                let callback = speakVerse.bind(this,voice, audio,idx+1,voiceChapter);
                TTS.speak(line, callback);
            }
            else{
                TTS.speak(line);
            }
        }
        const { idx, chapter, book, text, voice, audio, tooltip } = this.props;
        var enB = this.state.enBible;
        var enCurrentBook = findBook(enB, book);
        var enCurrentChapter = enCurrentBook.chapters[chapter];

        // note other languages may not always be loaded if not used
        var zhB = this.state.zhBible;
        if(zhB.length>0){
            var zhCurrentBook = findBook(zhB, book);
            var zhCurrentChapter = zhCurrentBook.chapters[chapter];
        }
        
        var chapterDisplay = parseInt(chapter,10)+1;
        var verseDisplay = parseInt(idx,10)+1;

        var renderText = "";
        var renderTooltip = "";

        renderText = getLocaleText(text, verseDisplay);
        renderTooltip = getLocaleText(tooltip, verseDisplay);

        let voiceChapter = [];
        switch(voice){
            case 'EN':
                voiceChapter = enCurrentChapter;
                break;
            case 'ZH':
                voiceChapter = zhCurrentChapter;
                break;
            default:
                break;
        }


        if('NA' === tooltip)
        {
            return (
                <div className="Verse" onClick={() => speakVerse(voice, audio, idx, voiceChapter)}> ({chapterDisplay},{verseDisplay}) {renderText}</div>
            )
        }
        else{
            return (
                <div className="VerseTooltip" onClick={() => speakVerse(voice, audio, idx, voiceChapter)}> 
                    ({chapterDisplay},{verseDisplay}) {renderText}
                    <span className="tooltiptext">({chapterDisplay},{verseDisplay}) {renderTooltip}</span>
                </div>
            )            
        }
    }
}

function mapStateToProps(state) {
    return {
            chapter: state.ReactBibleReducer.chapter,
            book: state.ReactBibleReducer.book,
            text: state.ReactBibleReducer.text_locale,
            tooltip: state.ReactBibleReducer.tooltip_locale,
            audio: state.ReactBibleReducer.audio,
            voice: state.ReactBibleReducer.voice_locale};
}
export default connect(mapStateToProps)(Verse)