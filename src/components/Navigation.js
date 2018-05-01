import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import bible from '../en_kjv.json'
import './Navigation.css';
import {findBook} from '../utils/common'

class Navigation extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }
    
    onChangeBook(event) {
        var abbrev = event.target.value;
        this.props.actions.gotoBook(abbrev);
    }
    onChangeChapter(event) {
        this.props.actions.gotoChapter(event.target.value);
    }
    onChangeText(event) {
        this.props.actions.setTextLocale(event.target.value);
    }
    onChangeVoice(event) {
        this.props.actions.setVoiceLocale(event.target.value);
    }
    onChangeAudioEnable(enabled){
        this.props.actions.setAudio(enabled);
    }

    render() {
        const { book, chapter, text, voice, audio } = this.props;
        var b = bible;
        var currentBook = findBook(b, book);
        var chapterList = [];
        for(var it = 0; it<currentBook.chapters.length; ++it){
            chapterList.push(it);
        }
        var mapBooks = function(X)
        {
            return <option key={X.name} value={X.abbrev}>{X.name}</option>;
        }
        var mapChapters = function(X, it)
        {
            return <option key={X} value={X}>{X+1}</option>;
        }
        return (
            <div className="Navigation">
                Navigation:
                <br />
                <select id="navBook" className="form-control" value={book} onChange={(event)=>{this.onChangeBook(event)}}>
                    {b.map(mapBooks)}
                </select>
                <select id="navChapter" className="form-control" value={chapter} onChange={(event)=>{this.onChangeChapter(event)}}>
                    {chapterList.map(mapChapters)}
                </select>
                <br />
                Text:
                <select id="navText" className="form-control" value={text} onChange={(event)=>{this.onChangeText(event)}}>
                    <option value='EN'>English</option>
                    <option value='ZH'>Chinese</option>
                </select>
                Voice: 
                <select id="navVoice" className="form-control" value={voice} onChange={(event)=>{this.onChangeVoice(event)}}>
                    <option value='EN'>English</option>
                    <option value='ZH'>Chinese</option>
                </select>
                pwr by (responsivevoice.org)
                <br /><br />
                <center>
                { audio?
                (<button id="mute" className="btn btn-outline-primary" onClick={(event)=>{this.onChangeAudioEnable(false)}}>Mute</button>):
                (<button id="unmute" className="btn btn-outline-secondary" onClick={(event)=>{this.onChangeAudioEnable(true)}}>unMute</button>)
                }
                </center>
            </div>
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
export default connect(mapStateToProps)(Navigation)