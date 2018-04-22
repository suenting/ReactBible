import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import bible from '../en_kjv.json'
import Chapter from './Chapter'
import {findBook} from '../utils/common'
class Book extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }
    
    render() {
        const { actions, book } = this.props;
        var b = bible;
        var currentBook = findBook(b, book);
        var bookName = currentBook.name;
        
        return (
            <div>
                <h1>{bookName}</h1>
                <br />
                <br />
                <Chapter actions={actions} />
                <br />
                <br />                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { book: state.ReactBibleReducer.book };
}
export default connect(mapStateToProps)(Book)