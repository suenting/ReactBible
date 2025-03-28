import React, { Component, useReducer, useEffect } from 'react';
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
    isLoaded:false,
    line: "",
    enabled: VoiceImpl.isSupported()
};

const ReactVoice = () => {
    const [state, dispatch] = useReducer(reducer, initial);


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

    const onVoiceCommand = (line)=>{
        dispatch({type: 'setLine', payload: line});

        // handle command here
        line = line.replace("Chapter","chapter")
        const splitLine = line.split("chapter");
        const voiceBook = splitLine[0].trim();
        const voiceChapter = splitLine[1]?splitLine[1].trim():"";
        const idxBook = books.indexOf(voiceBook);
        const idxChapter = parseInt(voiceChapter,10)-1;
        
        const currentBookAbbrv = document.getElementById('navBook').value;
        let currentBookIdx = booksAbrrv.indexOf(currentBookAbbrv);

        if(idxBook>=0){
            currentBookIdx = idxBook;
            const navBook = document.getElementById('navBook');
            navBook.value = booksAbrrv[idxBook];
            navBook.dispatchEvent( new Event('change', {bubbles: true}));
        }

        // verify chapter is within bounds of selected book
        if(!state.isLoaded){
            return;
        }
        const maxChapter = state.enBible[currentBookIdx].chapters.length;
        if(idxChapter>=0 && idxChapter<maxChapter){
            const navChapter = document.getElementById('navChapter');
            navChapter.value = idxChapter;
            navChapter.dispatchEvent( new Event('change', {bubbles: true}));
        }        
    }

    const start=()=>{
        VoiceImpl.start((line)=>{onVoiceCommand(line)});
    }

    if(state.enabled){
        return(
            <div title={`Try saying "Matthew chapter 5"`}>
                <MicIcon id="micIcon" onClick={(event)=>{start()}} />
            </div>
        )
    }
    return <div></div>;
}

ReactVoice.propTypes ={
    language: PropTypes.string,
    grammar: PropTypes.object
};

export default ReactVoice;