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

    isLocaleLoaded(locale){
        switch(locale){
            case 'EN':
                return this.state.enBible.length>0;
            case 'ZH':
                return this.state.zhBible.length>0;
            default:
                return true;
        }
    }

    fetchBibleJson(){
        let promiseList = [];
        // always load english
        if(!this.isLocaleLoaded("EN")){
            let enPromise = fetch('./en_kjv.json')
            .then(result => result.json())
            .then(result => {
                this.setState({
                    enBible:result
                })
            });
            promiseList.push(enPromise);
        }

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

        // chinese
        if(HasLocale(this, 'ZH') && !this.isLocaleLoaded("ZH")){
            let zhPromise = fetch('./zh_ncv.json')
            .then(result => result.json())
            .then(result => {
                this.setState({
                    zhBible:result
                })
            });
            promiseList.push(zhPromise);
        }

        Promise.all(promiseList).then(result => {
            this.setState({
                isLoaded: true
            });
        })
        .catch(error=>{
            // retry on error
            setTimeout(this.fetchBibleJson,500);
        });
    }

    componentDidMount() {
        this.fetchBibleJson();
    }
    componentDidUpdate(prevProps) {
        if( 
            this.props.text ===prevProps.text && 
            this.props.voice ===prevProps.voice &&
            this.props.tooltip ===prevProps.tooltip ){
                return;
            }
        if(
            this.isLocaleLoaded(this.props.text) &&
            this.isLocaleLoaded(this.props.voice) &&
            this.isLocaleLoaded(this.props.tooltip)){
                return;
            }
            this.setState({
                isLoaded: false
            });
            this.fetchBibleJson();
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