import React from 'react'
import { connect } from 'react-redux'
import './Chapter.css';
import Verse from './Verse'
import ShareIcon from '@material-ui/icons/Share';
import { findBook, findNextBook, findPrevBook } from '../utils/common'

const Chapter = (props) => {

    const onNext = (bible, book, chapter) => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // if next chapter
        const intChapter = parseInt(chapter, 10);
        if (intChapter < (book.chapters.length - 1)) {
            props.actions.gotoChapter(intChapter + 1);
            return;
        }

        // if next book
        const nextBook = findNextBook(bible, book.abbrev);
        if (nextBook) {
            props.actions.gotoBook(nextBook.abbrev);
        }
    }
    const onPrev = (bible, book, chapter) => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // if next chapter
        const intChapter = parseInt(chapter, 10);
        if (intChapter > 0) {
            props.actions.gotoChapter(intChapter - 1);
            return;
        }

        // if next book
        const nextBook = findPrevBook(bible, book.abbrev);
        if (nextBook) {
            props.actions.gotoBook(nextBook.abbrev);
            props.actions.gotoChapter(nextBook.chapters.length - 1);
        }
    }

    const onSetVerse = (verse) => {
        props.actions.setVerse(verse);
    }
    const onClearVerse = (verse) => {
        props.actions.clearVerse();
    }

    const { chapter, book, bibles, share, verse } = props;
    const enB = bibles.EN;
    const currentBook = findBook(enB, book);
    const currentChapter = currentBook.chapters[chapter];
    const ListVerse = function (X, index) {
        if (typeof(verse) === "number" && verse !== index) {
            return <></>;
        }
        return <div className="VerseContainer" key={`chapter_${chapter}_verse_${index+1}`}>
            { (share && (typeof(verse) !== "number")) && <ShareIcon className={'VerseShare'} onClick={()=>{onSetVerse(index);}} />}
            <Verse key={index + X} idx={index} bibles={bibles} >{X}</Verse>
        </div>;
    };
    const chapterDisplay = parseInt(chapter, 10) + 1;
    return (
        <div className="container Chapter">
            <h3>Chapter {chapterDisplay}</h3>
            <br />
            {currentChapter.map(ListVerse)}
            <br />
            {(typeof(verse) === "number") && <center>
                <button id="prevButton" className="btn btn-outline-primary" onClick={(event) => { onClearVerse() }}>BACK</button>
            </center>}
            {(typeof(verse) !== "number") && <center>
                <button id="prevButton" className="btn btn-outline-primary" onClick={(event) => { onPrev(enB, currentBook, chapter) }}>PREV</button>{' '}
                <button id="nextButton" className="btn btn-outline-primary" onClick={(event) => { onNext(enB, currentBook, chapter) }}>NEXT</button>
            </center>}
        </div>
    )
}

function mapStateToProps(state) {
    return { chapter: state.ReactBibleReducer.chapter, book: state.ReactBibleReducer.book, share: state.ReactBibleReducer.share, verse: state.ReactBibleReducer.verse };
}
export default connect(mapStateToProps)(Chapter)