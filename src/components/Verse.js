import React, { Component } from 'react'
import { connect } from 'react-redux'
import {findBook} from '../utils/common'
import enBible from '../en_kjv.json'
import zhBible from '../zh_ncv.json'
import './Verse.css';
class Verse extends Component {


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
        const { idx, chapter, book, text, voice, audio } = this.props;
        var enB = enBible;
        var enCurrentBook = findBook(enB, book);
        var enCurrentChapter = enCurrentBook.chapters[chapter];

        var zhB = zhBible;
        var zhCurrentBook = findBook(zhB, book);
        var zhCurrentChapter = zhCurrentBook.chapters[chapter];

        var chapterDisplay = parseInt(chapter,10)+1;
        var verseDisplay = parseInt(idx,10)+1;

        var renderText = "";
        var renderVoice = "";

        switch(text)
        {
            case 'EN':
                renderText = htmlDecode(enCurrentChapter[verseDisplay-1]);
            break;
            case 'ZH':
                renderText = zhCurrentChapter[verseDisplay-1];
            break;
            default:
            break;
        }

        switch(voice)
        {
            case 'EN':
                renderVoice = htmlDecode(enCurrentChapter[verseDisplay-1]);
            break;
            case 'ZH':
                renderVoice = zhCurrentChapter[verseDisplay-1];
            break;
            default:
            break;
        }
        return (
            <div className="Verse" onClick={() => speakVerse(renderVoice, voice, audio)}> ({chapterDisplay},{verseDisplay}) {renderText}</div>
        )
    }
}

function mapStateToProps(state) {
    return {
            chapter: state.ReactBibleReducer.chapter,
            book: state.ReactBibleReducer.book,
            text: state.ReactBibleReducer.text_locale,
            audio: state.ReactBibleReducer.audio,
            voice: state.ReactBibleReducer.voice_locale};
}
export default connect(mapStateToProps)(Verse)