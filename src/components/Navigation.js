import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import {findBook} from '../utils/common';
import './Navigation.css';
import TTS from '../utils/tts';
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
import MuteIcon from '@material-ui/icons/VolumeMute';
import UnMuteIcon from '@material-ui/icons/VolumeUp';
import ShareIcon from '@material-ui/icons/Share';
import QRCode from "react-qr-code";

const reducer = (state, action) => {
    switch(action.type) {
        case 'loadBible':
            return {...state, isLoaded: true, enBible: action.payload};
        case 'setLine':
            return {...state, line: action.payload};
    }
}
const initial = {
    enBible:[],
    isLoaded:false
};

const Navigation = (props) => {
    const [state, dispatch] = useReducer(reducer, initial);
    const { book, chapter, text, voice, voicePref, audio, theme, tooltip, share } = props;

    useEffect(()=>{
        const loadBible = () => {
            fetch('./en_nav.json')
            .then(result=>result.json())
            .then(result=>{
                dispatch({type: 'loadBible', payload: result})
            })
            .catch(error=>{
                setTimeout(()=>{loadBible()},500);
            });
        }
        loadBible();
    },[]);
    
    const onChangeBook = (event) => {
        const abbrev = event.target.value;
        props.actions.gotoBook(abbrev);
    }
    const onChangeChapter = (event) => {
        const intValue = parseInt(event.target.value,10);
        // prevent chapter from being set out of range
        if( !(intValue>=0 && intValue<event.target.options.length) ){
            return;
        }
        props.actions.gotoChapter(event.target.value);
    }
    const onChangeText = (event) => {
        props.actions.setTextLocale(event.target.value);
    }
    const onChangeToolTip = (event) => {
        props.actions.setToolTipLocale(event.target.value);
    }    
    const onChangeVoice = (event) => {
        props.actions.setVoiceLocale(event.target.value);
        TTS.cancel();
    }
    const onChangeVoicePref = (event) => {
        if(!event?.target?.value || event.target.value === 'default') {
            props.actions.setVoicePrefUri(undefined);    
        }
        else {
            props.actions.setVoicePrefUri(event.target.value);
        }
        TTS.cancel();
    }
    const onChangeAudioEnable = (enabled) => {
        props.actions.setAudio(enabled);
        TTS.cancel();
    }
    const onChangeTheme = (theme) => {
        props.actions.setTheme(theme);
    }
    const toggleTogetherJS = (event) => {
        window.TogetherJS();
    }
    const toggleShare = () => {
        props.actions.setShare(!share);
    }
    const copyToClipboard = () => {
        try {
            navigator.clipboard.writeText(window.location.href);
        } catch (err) {
            // suppress
        }
    }


    if(!state.isLoaded){
        return (<div></div>);
    }
   
    const b = state.enBible;
    const currentBook = findBook(b, book);
    const chapterList = [];
    for(let it = 0; it<currentBook.chapters.length; ++it){
        chapterList.push(it);
    }
    const mapBooks = function(X)
    {
        return <option key={X.name} value={X.abbrev}>{X.name}</option>;
    }
    const mapChapters = function(X, it)
    {
        return <option key={X} value={X}>{X+1}</option>;
    }

    const voiceList = TTS.fetchVoicesForLanguage(voice);

    return (
        <div className="Navigation">
            <List component="nav">
                
                <ListItem>
                    <ListItemIcon><BookmarkIcon/></ListItemIcon>
                    <ListItemText>Navigation</ListItemText>
                </ListItem>
                <ListItem>
                <select id="navBook" className="form-control BookNavigation" value={book} onChange={(event)=>{onChangeBook(event)}}>
                    {b.map(mapBooks)}
                </select>
                <select id="navChapter" className="form-control ChapterNavigation" value={chapter} onChange={(event)=>{onChangeChapter(event)}}>
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
                    <select id="navText" className="form-control" value={text} onChange={(event)=>{onChangeText(event)}}>
                        <option value='EN'>English</option>
                        <option value='ZH'>Chinese</option>
                        <option value='EL'>Greek</option>
                        <option value='DE'>German</option>
                        <option value='FR'>French</option>
                        <option value='ES'>Spanish</option>
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
                    <select id="navVoice" className="form-control" value={voice} onChange={(event)=>{onChangeVoice(event)}}>
                        <option value='EN'>English</option>
                        <option value='ZH'>Chinese</option>
                        <option value='DE'>German</option>
                        <option value='FR'>French</option>
                        <option value='ES'>Spanish</option>                            
                    </select>
                </ListItem>
                <ListItem>
                    <ListItemIcon><VoiceIcon/></ListItemIcon>
                    <ListItemText>
                    Voice Preference
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <select id="navVoicePref" className="form-control" value={voicePref} onChange={(event)=>{onChangeVoicePref(event)}}>
                        <option value={undefined}>default</option>
                        {voiceList.map((sysVoice)=>{
                            return <option value={sysVoice.voiceURI} key={sysVoice.voiceURI}>{sysVoice.name}</option>;
                        })}                          
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
                        (<button id="mute" className="navbtn btn btn-outline-primary" onClick={(event)=>{onChangeAudioEnable(false)}}>Mute</button>):
                        (<button id="unmute" className="navbtn btn btn-outline-secondary" onClick={(event)=>{onChangeAudioEnable(true)}}>UnMute</button>)
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
                            (<button id="toggletheme" className="navbtn btn btn-outline-primary" onClick={(event)=>{onChangeTheme('light')}}>Toggle Theme</button>):
                            (<button id="toggletheme" className="navbtn btn btn-outline-primary" onClick={(event)=>{onChangeTheme('dark')}}>Toggle Theme</button>)
                        }
                    </ListItemText>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemIcon><GroupIcon/></ListItemIcon>
                    <ListItemText>
                    <button className="navbtn btn btn-outline-primary" onClick={(event)=>{toggleTogetherJS(event)}}>Read Together</button>
                    </ListItemText>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemIcon><ToolTipIcon/></ListItemIcon>
                    <ListItemText>
                    <select id="navToolTip" className="form-control" value={tooltip} onChange={(event)=>{onChangeToolTip(event)}}>
                        <option value='NA'>N/A</option>
                        <option value='EN'>English</option>
                        <option value='ZH'>Chinese</option>
                        <option value='EL'>Greek</option>
                        <option value='DE'>German</option>
                        <option value='FR'>French</option>
                        <option value='ES'>Spanish</option>                            
                    </select>
                    </ListItemText>
                </ListItem>                    
                <Divider />
                <ListItem>
                    <ListItemIcon><ShareIcon/></ListItemIcon>
                    <ListItemText>
                    <button className="navbtn btn btn-outline-primary" onClick={(event)=>{toggleShare(!share)}}>Toggle Share</button>
                    </ListItemText>
                </ListItem>
                {share && <>
                    <ListItem>
                    <ListItemText>
                        <QRCode 
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            viewBox={`0 0 256 256`}
                            value={window.location.href}
                        />

                        <br /><br />
                        <button className="navbtn btn btn-outline-primary" onClick={(event)=>{copyToClipboard()}}>Copy URL to clipboard</button>

                    </ListItemText>
                    </ListItem>
                </>}
                <Divider />
                <ListItem>
                    <ListItemIcon><CodeIcon/></ListItemIcon>
                    <ListItemText>
                        <a className="navbtn btn btn-outline-primary" rel="noopener noreferrer" href="https://github.com/suenting/ReactBible" target="_blank">View Source</a>
                    </ListItemText>
                </ListItem>                    
            </List>
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
            voice: state.ReactBibleReducer.voice_locale,
            voicePref: state.ReactBibleReducer.voice_pref_uri,
            theme: state.ReactBibleReducer.theme,
            share: state.ReactBibleReducer.share,
            verse: state.ReactBibleReducer.verse
        };
}
export default connect(mapStateToProps)(Navigation)