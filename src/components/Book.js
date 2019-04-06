import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Chapter from './Chapter'
import { findBook } from '../utils/common'
class Book extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            enBible: [],
            zhBible: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        let enPromise = fetch('./en_kjv.json').then(result => result.json());

        // todo consider lazy loading
        let zhPromise = fetch('./zh_ncv.json').then(result => result.json());

        Promise.all([enPromise, zhPromise]).then(result => {
            const [enBible, zhBible] = result;
            this.setState({
                enBible: enBible,
                zhBible: zhBible,
                isLoaded: true
            });
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return (<div></div>);
        }
        const { actions, book } = this.props;
        var b = this.state.enBible;
        var currentBook = findBook(b, book);
        var bookName = currentBook.name;

        return (
            <div>
                <h1>{bookName}</h1>
                <br />
                <br />
                <Chapter actions={actions} enBible={this.state.enBible} zhBible={this.state.zhBible} />
                <br />
                <br />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        book: state.ReactBibleReducer.book,
        text: state.ReactBibleReducer.text_locale,
        tooltip: state.ReactBibleReducer.tooltip_locale,
        voice: state.ReactBibleReducer.voice_locale
    };
}
export default connect(mapStateToProps)(Book)