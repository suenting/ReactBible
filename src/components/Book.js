import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Chapter from './Chapter'
import { findBook } from '../utils/common'
class Book extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        text: PropTypes.string.isRequired,
        tooltip: PropTypes.string.isRequired,
        voice: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            enBible: [],
            zhBible: [],
            isLoaded: false,
        };
    }

    fetchBibleJson(){
        // always load english
        let enPromise = fetch('./en_kjv.json')
            .then(result => result.json())
            .then(result => {
                this.setState({
                    enBible:result
                })
            });

        // only load other locales if used
        const HasLocale = function(self, locale){
            if( 
                self.props.text === locale || 
                self.props.voice === locale ||
                self.props.tooltip === locale ){
                    return true;
                }
            return false;
        }
        let zhPromise = Promise.resolve('skip');
        if(HasLocale(this, 'ZH')){
            zhPromise = fetch('./zh_ncv.json')
            .then(result => result.json())
            .then(result => {
                this.setState({
                    zhBible:result
                })
            });
        }

        Promise.all([enPromise, zhPromise]).then(result => {
            this.setState({
                isLoaded: true
            });
        });
    }

    componentDidMount() {
        this.fetchBibleJson();
    }
    componentDidUpdate(prevProps) {
        if( 
            this.props.text !==prevProps.text || 
            this.props.voice !==prevProps.voice ||
            this.props.tooltip !==prevProps.tooltip ){
                this.setState({
                    isLoaded: false
                });
                this.fetchBibleJson();
            }
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
    };
}
export default connect(mapStateToProps)(Book)