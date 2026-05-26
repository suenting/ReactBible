import { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import './SearchDialog.css';

const getBibleFromLocale = function (bibles, locale) {
    switch (locale) {
        case 'EN':
            return bibles.EN;
        case 'EN-NIV':
            return bibles.ENB;
        case 'ZH':
            return bibles.ZH;
        case 'EL':
            return bibles.EL;
        case 'DE':
            return bibles.DE;
        case 'FR':
            return bibles.FR;
        case 'ES':
            return bibles.ES;
        case 'AR':
            return bibles.AR;
        case 'KO':
            return bibles.KO;
        case 'PT':
            return bibles.PT;
        case 'RO':
            return bibles.RO;
        case 'RU':
            return bibles.RU;
        case 'VI':
            return bibles.VI;
        default:
            return null;
    }
};

const SearchDialog = ({ open, onClose, text, actions }) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const resetSearch = () => {
        setSearchResults([]);
    }
    const onSearchClick = () => {
        if (!window.bibles || !search || search.length < 3) { resetSearch(); return; }
        // search all verses in current language for substring search
        const currentBible = getBibleFromLocale(window?.bibles, text);
        if (!currentBible) { resetSearch(); return; }
        const results = [];
        for (let bookIter = 0; bookIter < currentBible.length; ++bookIter) {
            const currentBook = currentBible[bookIter];
            const currentBookName = currentBook.name;
            const chapters = currentBook.chapters;
            for (let chapterIter = 0; chapterIter < chapters.length; ++chapterIter) {
                const chapter = chapters[chapterIter];
                for (let verseIter = 0; verseIter < chapter.length; ++verseIter) {
                    const verse = chapter[verseIter];
                    if (verse.toLowerCase().includes(search.toLowerCase())) {
                        results.push({
                            book: currentBookName,
                            bookAbbrev: currentBook.abbrev,
                            chapterIdx: chapterIter,
                            verseIdx: verseIter,
                            verse
                        })
                    }
                }
            }
        }
        setSearchResults(results);
    }
    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            // Your logic here
            onSearchClick()
            event.preventDefault(); // Prevents default form submission if necessary
        }
    };
    const onVerseClick = (book, chapter) => {
        actions?.gotoBook(book);
        actions?.gotoChapter(chapter);
        onClose();
    }
    return <Dialog open={open} onClose={onClose} fullWidth={true}
        maxWidth="md">
        <DialogTitle>Search {searchResults.length > 0 ? `(${searchResults.length})` : ''}</DialogTitle>
        <DialogContent>
            <Input placeholder="Find a verse containing keyword..." onKeyUp={handleKeyUp} value={search} onChange={(e) => { setSearch(e.target.value) }} fullWidth endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        onClick={onSearchClick}
                    >
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            } />
            <hr />
            {searchResults.map((value, index) => {
                return <div>
                    <div className="verseTitle" onClick={() => { onVerseClick(value.bookAbbrev, value.chapterIdx) }}>{value.book} chapter {value.chapterIdx + 1} verse {value.verseIdx + 1}</div>
                    {value.verse}
                </div>
            })}
        </DialogContent>
    </Dialog>
};

function mapStateToProps(state) {
    return {
        chapter: state.ReactBibleReducer.chapter,
        book: state.ReactBibleReducer.book,
        text: state.ReactBibleReducer.text_locale,
        tooltip: state.ReactBibleReducer.tooltip_locale,
        audio: state.ReactBibleReducer.audio,
        voicePref: state.ReactBibleReducer.voice_pref_uri,
        voice: state.ReactBibleReducer.voice_locale
    };
}
export default connect(mapStateToProps)(SearchDialog)