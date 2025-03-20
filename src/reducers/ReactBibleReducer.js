import { GOTO_BOOK, GOTO_CHAPTER, SET_AUDIO, SET_TEXT_LOCALE, SET_VOICE_LOCALE, SET_VOICE_PREF_URI, SET_THEME, SET_TOOLTIP_LOCALE, SET_SHARE, SET_VERSE, CLEAR_VERSE } from '../constants/ActionTypes'

// default state
let initialState = {
  book: "gn",
  chapter: "0",
  audio: true,
  text_locale: "EN",
  voice_locale: "EN",
  voice_pref_uri: undefined,
  tooltip_locale: "NA",
  theme: "light",
  share: false
}

const LoadState = function () {
  // initial load state call
  const previousState = localStorage.getItem('react-bible-state');
  if (previousState && previousState !== "undefined") {
    const stateObj = JSON.parse(previousState);
    initialState = stateObj;
  }

  // read query string params if they exist
  const queryString = window?.location?.search;
  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    const book = urlParams.get('book');
    const chapterUrl = urlParams.get('chapter');
    const verseUrl = urlParams.get('verse');
    if (book && chapterUrl) {
      const chapter = `${(parseInt(chapterUrl) - 1)}`;
      initialState.book = book;
      initialState.chapter = chapter;
      if (verseUrl) {
        const verse = (parseInt(verseUrl) - 1);
        initialState.verse = verse;
      }
    }
  }
}
LoadState();

const SaveState = function (state) {
  const serializedState = JSON.stringify(state);
  localStorage.setItem('react-bible-state', serializedState);

  // write query string params
  if (history.replaceState) {
    const urlChapter = parseInt(state.chapter) + 1; // display chapter as 1 based index
    let verseString = '';
    if (typeof (state.verse) === "number") {
      verseString = `&verse=${state.verse + 1}`; // display verse as 1 based index
    }
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?book=${state.book}&chapter=${urlChapter}${verseString}`;
    window.history.replaceState({ path: newurl }, '', newurl);
  }
}

export default function ReactBibleReducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case GOTO_BOOK:
      if (action.text === "-1") {
        return state;
      }
      newState = Object.assign({}, state, {
        book: action.text,
        chapter: "0",
        verse: undefined
      });
      break;
    case GOTO_CHAPTER:
      if (action.text === "-1") {
        return state;
      }
      newState = Object.assign({}, state, {
        chapter: action.text,
        verse: undefined
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
        voice_locale: action.text,
        voice_pref_uri: undefined
      });
      break;
    case SET_VOICE_PREF_URI:
      newState = Object.assign({}, state, {
        voice_pref_uri: action.text
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
    case SET_SHARE:
      newState = Object.assign({}, state, {
        share: action.text
      });
      break;
    case SET_VERSE:
      newState = Object.assign({}, state, {
        verse: action.text
      });
      break;
    case CLEAR_VERSE:
      newState = Object.assign({}, state, {
        verse: undefined
      });
      break;
    default:
      return state
  }

  SaveState(newState);
  return newState;

}