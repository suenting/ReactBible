import React, { Component } from 'react'
import { connect } from 'react-redux'
import {findBook} from '../utils/common'
import './Verse.css';
class Verse extends Component {

    constructor(props){
        super(props);
        this.state = {
            enBible: props.enBible,
            zhBible: props.zhBible
        }
    }

    render() {
        var htmlDecode = function(input){
            var doc = new DOMParser().parseFromString(input, "text/html");
            return doc.documentElement.textContent;
        }
        var speakVerse = function(line, voice, audio){
            
            if(!audio)
            {
                return;
            }
            /*eslint-disable no-undef*/
            switch(voice)
            {
                case "EN":
                    responsiveVoice.speak(line, "UK English Female");
                break;
                case "ZH":
                    responsiveVoice.speak(line, "Chinese Female");
                break;
                default:
                break;
            }
            /*eslint-enable no-undef*/
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
        var renderVoice = "";
        var renderTooltip = "";

        var getLocaleText = function(locale){
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
        renderText = getLocaleText(text);
        renderVoice = getLocaleText(voice);
        renderTooltip = getLocaleText(tooltip);


        if('NA' === tooltip)
        {
            return (
                <div className="Verse" onClick={() => speakVerse(renderVoice, voice, audio)}> ({chapterDisplay},{verseDisplay}) {renderText}</div>
            )
        }
        else{
            return (
                <div className="VerseTooltip" onClick={() => speakVerse(renderVoice, voice, audio)}> 
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