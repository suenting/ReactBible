import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Chapter.css';
import Verse from './Verse'
import { findBook, findNextBook } from '../utils/common'

class Chapter extends Component {

    constructor(props){
        super(props);
        this.state = {
            enBible: props.enBible,
            zhBible: props.zhBible
        }
    }

    static propTypes = {
        actions: PropTypes.object.isRequired
    }
    onNext(bible, book, chapter) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // if next chapter
        var intChapter = parseInt(chapter, 10);
        if (intChapter < (book.chapters.length - 1)) {
            this.props.actions.gotoChapter(intChapter + 1);
            return;
        }
        
        // if next book
        var nextBook = findNextBook(bible, book.abbrev);
        if (nextBook) {
            this.props.actions.gotoBook(nextBook.abbrev);
        }
    }
    render() {
        const { chapter, book } = this.props;
        var enB = this.state.enBible;
        var zhB = this.state.zhBible;
        var currentBook = findBook(enB, book);
        var currentChapter = currentBook.chapters[chapter];
        var ListVerse = function (X, index) {
            return <Verse key={index+X} idx={index} enBible={enB} zhBible={zhB} >{X}</Verse>;
        };
        var chapterDisplay = parseInt(chapter, 10) + 1;
        return (
            <div className="container Chapter">
                <h3>Chapter {chapterDisplay}</h3>
                <br />
                {currentChapter.map(ListVerse)}
                <br />
                <center><button id="nextButton" className="btn btn-outline-primary" onClick={(event) => { this.onNext(enB, currentBook, chapter) }}>NEXT</button></center>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { chapter: state.ReactBibleReducer.chapter, book: state.ReactBibleReducer.book };
}
export default connect(mapStateToProps)(Chapter)