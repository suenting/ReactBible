import * as types from '../constants/ActionTypes'

export const gotoChapter = text => ({ type: types.GOTO_CHAPTER, text })
export const gotoBook = text => ({ type: types.GOTO_BOOK, text })
export const setTextLocale = text => ({ type: types.SET_TEXT_LOCALE, text })
export const setToolTipLocale = text => ({ type: types.SET_TOOLTIP_LOCALE, text })
export const setVoiceLocale = text => ({ type: types.SET_VOICE_LOCALE, text })
export const setAudio = text => ({ type: types.SET_AUDIO, text })
export const setTheme = text =>({ type: types.SET_THEME, text})
export const setShare = text =>({ type: types.SET_SHARE, text})
export const setVerse = text =>({ type: types.SET_VERSE, text})
export const clearVerse = () =>({ type: types.CLEAR_VERSE })

