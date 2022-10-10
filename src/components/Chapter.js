import React from 'react'
import { connect } from 'react-redux'
import './Chapter.css';
import Verse from './Verse'
import { findBook, findNextBook } from '../utils/common'

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

    const { chapter, book, bibles } = props;
    const enB = bibles.EN;
    const currentBook = findBook(enB, book);
    const currentChapter = currentBook.chapters[chapter];
    const ListVerse = function (X, index) {
        return <Verse key={index+X} idx={index} bibles={bibles}>{X}</Verse>;
    };
    const chapterDisplay = parseInt(chapter, 10) + 1;
    return (
        <div className="container Chapter">
            <h3>Chapter {chapterDisplay}</h3>
            <br />
            {currentChapter.map(ListVerse)}
            <br />
            <center><button id="nextButton" className="btn btn-outline-primary" onClick={(event) => { onNext(enB, currentBook, chapter) }}>NEXT</button></center>
        </div>
    )
}

function mapStateToProps(state) {
    return { chapter: state.ReactBibleReducer.chapter, book: state.ReactBibleReducer.book };
}
export default connect(mapStateToProps)(Chapter)