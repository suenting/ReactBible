import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import enBible from '../en_kjv.json'
import './Chapter.css';
import Verse from './Verse'
import {findBook} from '../utils/common'

class Chapter extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }
    
    render() {
        const { chapter, book } = this.props;
        var enB = enBible;
        var currentBook = findBook(enB, book);
        var currentChapter = currentBook.chapters[chapter];
        var ListVerse = function(X, index) {
            return <Verse key={X} idx={index}>{X}</Verse>;
        };
        var chapterDisplay = parseInt(chapter,10)+1;
        return (
            <div className="container Chapter">
                <h3>Chapter {chapterDisplay}</h3>
                <br />
                {currentChapter.map(ListVerse)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { chapter: state.ReactBibleReducer.chapter,book: state.ReactBibleReducer.book };
}
export default connect(mapStateToProps)(Chapter)