import { GOTO_BOOK, GOTO_CHAPTER, SET_AUDIO, SET_TEXT_LOCALE, SET_VOICE_LOCALE, SET_THEME, SET_TOOLTIP_LOCALE } from '../constants/ActionTypes'

// default state
let initialState = {
    book:"gn",
    chapter:"0",
    audio:true,
    text_locale:"EN",
    voice_locale:"EN",
    tooltip_locale: "NA",
    theme:"light"
}

const LoadState = function(){
    const previousState = localStorage.getItem('react-bible-state');
    if(previousState  && previousState !== "undefined")    {
      const stateObj = JSON.parse(previousState);
      initialState = stateObj;
    }
}
LoadState();

const SaveState = function(state){
  const serializedState = JSON.stringify(state);
  localStorage.setItem('react-bible-state', serializedState);
}

export default function ReactBibleReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case GOTO_BOOK:
      if(action.text==="-1"){
        return state;
      }
      newState = Object.assign({}, state, {
        book: action.text,
        chapter: "0"
      });
      break;
    case GOTO_CHAPTER:
      if(action.text==="-1"){
        return state;
      }
      newState = Object.assign({}, state, {
        chapter: action.text
      });
      break;
    case SET_TEXT_LOCALE:
      newState = Object.assign({}, state, {
        text_locale: action.text
      });
      break;
    case SET_TOOLTIP_LOCALE:
      newState = Object.assign({}, state, {
        tooltip_locale: action.text
      });
      break;      
    case SET_VOICE_LOCALE:
      newState = Object.assign({}, state, {
        voice_locale: action.text
      });
      break;
    case SET_AUDIO:
      newState = Object.assign({}, state, {
        audio: action.text
      });
      break;
    case SET_THEME:
      newState = Object.assign({}, state, {
        theme: action.text
      });
      break;
    default:
      return state
  }

  SaveState(newState);
  return newState;

}