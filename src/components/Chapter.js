import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Chapter.css';
import Verse from './Verse'
import { findBook, findNextBook } from '../utils/common'

class Chapter extends PureComponent {

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
        const intChapter = parseInt(chapter, 10);
        if (intChapter < (book.chapters.length - 1)) {
            this.props.actions.gotoChapter(intChapter + 1);
            return;
        }
        
        // if next book
        const nextBook = findNextBook(bible, book.abbrev);
        if (nextBook) {
            this.props.actions.gotoBook(nextBook.abbrev);
        }
    }
    render() {
        const { chapter, book } = this.props;
        const enB = this.state.enBible;
        const zhB = this.state.zhBible;
        const currentBook = findBook(enB, book);
        const currentChapter = currentBook.chapters[chapter];
        const ListVerse = function (X, index) {
            return <Verse key={index+X} idx={index} enBible={enB} zhBible={zhB} >{X}</Verse>;
        };
        const chapterDisplay = parseInt(chapter, 10) + 1;
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