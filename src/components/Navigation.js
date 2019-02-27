import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import bible from '../en_kjv.json'
import {findBook} from '../utils/common'
import './Navigation.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


import BookmarkIcon from '@material-ui/icons/Bookmark';
import LanguageIcon from '@material-ui/icons/Language';
import VoiceIcon from '@material-ui/icons/RecordVoiceOver';
import GroupIcon from '@material-ui/icons/Group';
import CodeIcon from '@material-ui/icons/Code';
import BrightIcon from '@material-ui/icons/BrightnessMedium';

import MuteIcon from '@material-ui/icons/VolumeMute'
import UnMuteIcon from '@material-ui/icons/VolumeUp'

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
    onChangeTheme(theme){
        this.props.actions.setTheme(theme);
    }
    toggleTogetherJS(event){
        window.TogetherJS();
    }

    render() {
        const { book, chapter, text, voice, audio, theme } = this.props;
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
                <List component="nav">
                    
                    <ListItem>
                        <ListItemIcon><BookmarkIcon/></ListItemIcon>
                        <ListItemText>Navigation</ListItemText>
                    </ListItem>
                    <ListItem>
                    <select id="navBook" className="form-control BookNavigation" value={book} onChange={(event)=>{this.onChangeBook(event)}}>
                        {b.map(mapBooks)}
                    </select>
                    <select id="navChapter" className="form-control ChapterNavigation" value={chapter} onChange={(event)=>{this.onChangeChapter(event)}}>
                        {chapterList.map(mapChapters)}
                    </select>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon><LanguageIcon/></ListItemIcon>
                        <ListItemText>
                        Text Language
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <select id="navText" className="form-control" value={text} onChange={(event)=>{this.onChangeText(event)}}>
                            <option value='EN'>English</option>
                            <option value='ZH'>Chinese</option>
                        </select>
                    </ListItem>

                    <Divider />
                    <ListItem>
                        <ListItemIcon><VoiceIcon/></ListItemIcon>
                        <ListItemText>
                        Voice Language
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <select id="navVoice" className="form-control" value={voice} onChange={(event)=>{this.onChangeVoice(event)}}>
                            <option value='EN'>English</option>
                            <option value='ZH'>Chinese</option>
                        </select>
                    </ListItem>
                    <center>
                    { audio?
                    (<button id="mute" className="btn btn-outline-primary" onClick={(event)=>{this.onChangeAudioEnable(false)}}><UnMuteIcon></UnMuteIcon>Mute</button>):
                    (<button id="unmute" className="btn btn-outline-secondary" onClick={(event)=>{this.onChangeAudioEnable(true)}}><MuteIcon></MuteIcon>UnMute</button>)
                    }
                    </center>
                    <br />
                    <Divider />
                    <ListItem>
                        <ListItemIcon><BrightIcon/></ListItemIcon>
                        <ListItemText>
                            {
                                theme==='dark'?
                                (<button className="btn btn-outline-primary" onClick={(event)=>{this.onChangeTheme('light')}}>Toggle Theme</button>):
                                (<button className="btn btn-outline-primary" onClick={(event)=>{this.onChangeTheme('dark')}}>Toggle Theme</button>)
                            }
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon><GroupIcon/></ListItemIcon>
                        <ListItemText>
                        Read Together
                        </ListItemText>
                    </ListItem>
                    <center>
                        <button className="btn btn-outline-primary" onClick={(event)=>{this.toggleTogetherJS(event)}}>Toggle TogetherJS</button>
                    </center>
                    <br />
                    <Divider />
                    <ListItem>
                        <ListItemIcon><CodeIcon/></ListItemIcon>
                        <ListItemText>
                            <a className="btn btn-outline-primary" href="https://github.com/suenting/ReactBible" target="_blank">View Source</a>
                        </ListItemText>
                    </ListItem>                    
                </List>
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
            voice: state.ReactBibleReducer.voice_locale,
            theme: state.ReactBibleReducer.theme};
}
export default connect(mapStateToProps)(Navigation)