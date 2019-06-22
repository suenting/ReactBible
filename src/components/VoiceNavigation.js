import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MicIcon from '@material-ui/icons/Mic';
import VoiceImpl from './VoiceImpl';

const books = [
    "Genesis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "Judges",
    "Ruth",
    "1st Samuel",
    "2nd Samuel",
    "1st Kings",
    "2nd Kings",
    "1st Chronicles",
    "2nd Chronicles",
    "Ezra",
    "Nehemiah",
    "Esther",
    "Job",
    "Psalms",
    "Proverbs",
    "Ecclesiastes",
    "Song of Solomon",
    "Isaiah",
    "Jeremiah",
    "Lamentations",
    "Ezekiel",
    "Daniel",
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakkuk",
    "Zephaniah",
    "Haggai",
    "Zechariah",
    "Malachi",
    "Matthew",
    "Mark",
    "Luke",
    "John",
    "Acts",
    "Romans",
    "1st Corinthians",
    "2nd Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "1st Thessalonians",
    "2nd Thessalonians",
    "1st Timothy",
    "2nd Timothy",
    "Titus",
    "Philemon",
    "Hebrews",
    "James",
    "1st Peter",
    "2nd Peter",
    "1st John",
    "2nd John",
    "3rd John",
    "Jude",
    "Revelation"
];

const booksAbrrv = ["gn", "ex", "lv", "nm", "dt", "js", "jud", "rt", "1sm", "2sm", "1kgs", "2kgs", "1ch", "2ch", "ezr", "ne", "et", "job", "ps", "prv", "ec", "so", "is", "jr", "lm", "ez", "dn", "ho", "jl", "am", "ob", "jn", "mi", "na", "hk", "zp", "hg", "zc", "ml", "mt", "mk", "lk", "jo", "act", "rm", "1co", "2co", "gl", "eph", "ph", "cl", "1ts", "2ts", "1tm", "2tm", "tt", "phm", "hb", "jm", "1pe", "2pe", "1jo", "2jo", "3jo", "jd", "re"];

class ReactVoice extends Component{
    constructor(props){
        super(props);
        this.state = {
            line: "",
            enabled: VoiceImpl.isSupported()
        };

        

    }

    onVoiceCommand = (line)=>{
        this.setState({
            line: line
        });
        
        // handle command here
        line = line.replace("Chapter","chapter")
        const splitLine = line.split("chapter");
        const voiceBook = splitLine[0].trim();
        const voiceChapter = splitLine[1]?splitLine[1].trim():"";
        const idxBook = books.indexOf(voiceBook);
        const idxChapter = parseInt(voiceChapter,10)-1;

        if(idxBook>=0){
            const navBook = document.getElementById('navBook');
            navBook.value = booksAbrrv[idxBook];
            navBook.dispatchEvent( new Event('change', {bubbles: true}));
        }
        if(idxChapter>=0){
            const navChapter = document.getElementById('navChapter');
            navChapter.value = idxChapter;
            navChapter.dispatchEvent( new Event('change', {bubbles: true}));
        }        
    }

    start(){
        VoiceImpl.start(this.onVoiceCommand);
    }

    render(){
        if(this.state.enabled){
            return(
                <div>
                    <MicIcon id="micIcon" onClick={(event)=>{this.start()}} />
                </div>
            )
        }
        return <div></div>;
    };
}

ReactVoice.propTypes ={
    language: PropTypes.string,
    grammar: PropTypes.object
};

export default ReactVoice;