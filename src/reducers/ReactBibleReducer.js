import { GOTO_BOOK, GOTO_CHAPTER, SET_AUDIO, SET_TEXT_LOCALE, SET_VOICE_LOCALE } from '../constants/ActionTypes'

const initialState = {
    book:"gn",
    chapter:"0",
    audio:true,
    text_locale:"EN",
    voice_locale:"EN",
}

export default function chapter(state = initialState, action) {
  switch (action.type) {
    case GOTO_BOOK:
      if(action.text==="-1"){
        return state;
      }
      return Object.assign({}, state, {
        book: action.text,
        chapter: "0"
      })
    case GOTO_CHAPTER:
      if(action.text==="-1"){
        return state;
      }
      return Object.assign({}, state, {
        chapter: action.text
      })
    case SET_TEXT_LOCALE:
      return Object.assign({}, state, {
        text_locale: action.text
      })
    case SET_VOICE_LOCALE:
      return Object.assign({}, state, {
        voice_locale: action.text
      })
    case SET_AUDIO:
      return Object.assign({}, state, {
        audio: action.text
      })
    default:
      return state
  }
}