import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
import ToolTipIcon from '@material-ui/icons/FindReplace';

import MuteIcon from '@material-ui/icons/VolumeMute'
import UnMuteIcon from '@material-ui/icons/VolumeUp'

class Navigation extends Component {

    constructor(props){
        super(props);
        this.state = {
            enBible:[],
            isLoaded:false,
        };
    }

    loadBible(){
        // todo: consider sliming this json file down
        fetch('./en_kjv.json')
        .then(result=>result.json())
        .then(result=>{
            this.setState({
                enBible: result,
                isLoaded: true
            });
        })
        .catch(error=>{
            setTimeout(this.loadBible,500);
        });
    }

    componentDidMount(){
        this.loadBible();
    }    

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
    onChangeToolTip(event) {
        this.props.actions.setToolTipLocale(event.target.value);
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
        if(!this.state.isLoaded){
            return (<div></div>);
        }
        const { book, chapter, text, voice, audio, theme, tooltip } = this.props;
        var b = this.state.enBible;
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
                    <ListItem>
                        <ListItemIcon>
                        { audio?
                            (<UnMuteIcon></UnMuteIcon>):
                            (<MuteIcon></MuteIcon>)
                        }
                        </ListItemIcon>
                        <ListItemText>
                        { audio?
                            (<button id="mute" className="navbtn btn btn-outline-primary" onClick={(event)=>{this.onChangeAudioEnable(false)}}>Mute</button>):
                            (<button id="unmute" className="navbtn btn btn-outline-secondary" onClick={(event)=>{this.onChangeAudioEnable(true)}}>UnMute</button>)
                        }
                        </ListItemText>                        
                    </ListItem>
                    <br />
                    <Divider />
                    <ListItem>
                        <ListItemIcon><BrightIcon/></ListItemIcon>
                        <ListItemText>
                            {
                                theme==='dark'?
                                (<button id="toggletheme" className="navbtn btn btn-outline-primary" onClick={(event)=>{this.onChangeTheme('light')}}>Toggle Theme</button>):
                                (<button id="toggletheme" className="navbtn btn btn-outline-primary" onClick={(event)=>{this.onChangeTheme('dark')}}>Toggle Theme</button>)
                            }
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon><GroupIcon/></ListItemIcon>
                        <ListItemText>
                        <button className="navbtn btn btn-outline-primary" onClick={(event)=>{this.toggleTogetherJS(event)}}>Read Together</button>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon><ToolTipIcon/></ListItemIcon>
                        <ListItemText>
                        <select id="navToolTip" className="form-control" value={tooltip} onChange={(event)=>{this.onChangeToolTip(event)}}>
                            <option value='NA'>N/A</option>
                            <option value='EN'>English</option>
                            <option value='ZH'>Chinese</option>
                        </select>
                        </ListItemText>
                    </ListItem>                    
                    <Divider />
                    <ListItem>
                        <ListItemIcon><CodeIcon/></ListItemIcon>
                        <ListItemText>
                            <a className="navbtn btn btn-outline-primary" href="https://github.com/suenting/ReactBible" target="_blank">View Source</a>
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
            tooltip: state.ReactBibleReducer.tooltip_locale,
            audio: state.ReactBibleReducer.audio,
            voice: state.ReactBibleReducer.voice_locale,
            theme: state.ReactBibleReducer.theme};
}
export default connect(mapStateToProps)(Navigation)