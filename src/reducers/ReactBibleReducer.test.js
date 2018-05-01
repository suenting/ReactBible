import * as types from '../constants/ActionTypes'
import reducer from './ReactBibleReducer'

describe('bible reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                book: "gn",
                chapter: "0",
                audio: true,
                text_locale: "EN",
                voice_locale: "EN",
            }
        )
    })
    it('should handle GOTO_BOOK', () => {
        expect(
            reducer([], {
                type: types.GOTO_BOOK,
                text: 'ex'
            })
        ).toEqual({
            book: "ex",
            chapter: "0"
        })
    })
    it('should handle GOTO_CHAPTER', () => {
        expect(
            reducer([], {
                type: types.GOTO_CHAPTER,
                text: '1'
            })
        ).toEqual({
            chapter: "1"
        })
    })

    it('should handle SET_TEXT_LOCALE', () => {
        expect(
            reducer([], {
                type: types.SET_TEXT_LOCALE,
                text: 'EN'
            })
        ).toEqual({
            text_locale: "EN"
        })
    })
    
    it('should handle SET_VOICE_LOCALE', () => {
        expect(
            reducer([], {
                type: types.SET_VOICE_LOCALE,
                text: 'EN'
            })
        ).toEqual({
            voice_locale: "EN"
        })
    })
    
    it('should handle SET_AUDIO', () => {
        expect(
            reducer([], {
                type: types.SET_AUDIO,
                text: false
            })
        ).toEqual({
            audio: false
        })
    })    
})