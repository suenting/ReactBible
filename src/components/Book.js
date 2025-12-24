import React, { useEffect, useReducer } from 'react'
import { connect } from 'react-redux'
import Chapter from './Chapter'
import { findBook } from '../utils/common'

const reducer = (state, action) => {
    switch (action.type) {
        case 'loadEN':
            return { ...state, enBible: action.payload };
        case 'loadENNIV':
            return { ...state, ennivBible: action.payload };
        case 'loadZH':
            return { ...state, zhBible: action.payload };
        case 'loadEL':
            return { ...state, elBible: action.payload };
        case 'loadDE':
            return { ...state, deBible: action.payload };
        case 'loadFR':
            return { ...state, frBible: action.payload };
        case 'loadES':
            return { ...state, esBible: action.payload };
        case 'loadAR':
            return { ...state, arBible: action.payload };
        case 'loadKO':
            return { ...state, koBible: action.payload };
        case 'loadPT':
            return { ...state, ptBible: action.payload };
        case 'loadRO':
            return { ...state, roBible: action.payload };
        case 'loadRU':
            return { ...state, ruBible: action.payload };
        case 'loadVI':
            return { ...state, viBible: action.payload };
        case 'setLoaded':
            return { ...state, isLoaded: action.payload };
    }
}
const initial = {
    enBible: [],
    ennivBible: [],
    zhBible: [],
    elBible: [],
    deBible: [],
    frBible: [],
    esBible: [],
    arBible: [],
    koBible: [],
    ptBible: [],
    roBible: [],
    ruBible: [],
    viBible: [],
    isLoaded: false
};

const Book = (props) => {
    const [state, dispatch] = useReducer(reducer, initial);
    const isLocaleLoaded = (locale) => {
        switch (locale) {
            case 'EN':
                return state.enBible.length > 0;
            case 'EN-NIV':
                return state.ennivBible.length > 0;
            case 'ZH':
                return state.zhBible.length > 0;
            case 'EL':
                return state.elBible.length > 0;
            case 'DE':
                return state.deBible.length > 0;
            case 'FR':
                return state.frBible.length > 0;
            case 'ES':
                return state.esBible.length > 0;
            case 'AR':
                return state.arBible.length > 0;
            case 'KO':
                return state.koBible.length > 0;
            case 'PT':
                return state.ptBible.length > 0;
            case 'RO':
                return state.roBible.length > 0;
            case 'RU':
                return state.ruBible.length > 0;
            case 'VI':
                return state.viBible.length > 0;
            default:
                return true;
        }
    }

    const fetchBibleJson = () => {
        let promiseList = [];
        // always load english
        if (!isLocaleLoaded("EN")) {
            let enPromise = fetch('./en_kjv.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadEN', payload: result });
                });
            promiseList.push(enPromise);
        }

        // only load other locales if used
        const HasLocale = function (locale) {
            if (
                props.text === locale ||
                props.voice === locale ||
                props.tooltip === locale) {
                return true;
            }
            return false;
        }

        // basic english
        if (HasLocale('EN-NIV') && !isLocaleLoaded("EN-NIV")) {
            let enbPromise = fetch('./en_niv.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadENNIV', payload: result });
                });
            promiseList.push(enbPromise);
        }

        // chinese
        if (HasLocale('ZH') && !isLocaleLoaded("ZH")) {
            let zhPromise = fetch('./zh_ncv.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadZH', payload: result });
                });
            promiseList.push(zhPromise);
        }

        // german
        if (HasLocale('DE') && !isLocaleLoaded("DE")) {
            let dePromise = fetch('./de_schlachter.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadDE', payload: result });
                });
            promiseList.push(dePromise);
        }

        // greek
        if (HasLocale('EL') && !isLocaleLoaded("EL")) {
            let elPromise = fetch('./el_greek.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadEL', payload: result });
                });
            promiseList.push(elPromise);
        }

        // spanish
        if (HasLocale('ES') && !isLocaleLoaded("ES")) {
            let esPromise = fetch('./es_rvr.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadES', payload: result });
                });
            promiseList.push(esPromise);
        }

        // french
        if (HasLocale('FR') && !isLocaleLoaded("FR")) {
            let frPromise = fetch('./fr_apee.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadFR', payload: result });
                });
            promiseList.push(frPromise);
        }

        // arabic
        if (HasLocale('AR') && !isLocaleLoaded("AR")) {
            let arPromise = fetch('./ar_svd.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadAR', payload: result });
                });
            promiseList.push(arPromise);
        }

        // korean
        if (HasLocale('KO') && !isLocaleLoaded("KO")) {
            let koPromise = fetch('./ko_ko.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadKO', payload: result });
                });
            promiseList.push(koPromise);
        }

        // portugese
        if (HasLocale('PT') && !isLocaleLoaded("PT")) {
            let ptPromise = fetch('./pt_aa.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadPT', payload: result });
                });
            promiseList.push(ptPromise);
        }

        // romanian
        if (HasLocale('RO') && !isLocaleLoaded("RO")) {
            let roPromise = fetch('./ro_cornilescu.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadRO', payload: result });
                });
            promiseList.push(roPromise);
        }

        // russian
        if (HasLocale('RU') && !isLocaleLoaded("RU")) {
            let ruPromise = fetch('./ru_synodal.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadRU', payload: result });
                });
            promiseList.push(ruPromise);
        }

        // vietnam
        if (HasLocale('VI') && !isLocaleLoaded("VI")) {
            let viPromise = fetch('./vi_vietnamese.json')
                .then(result => result.json())
                .then(result => {
                    dispatch({ type: 'loadVI', payload: result });
                });
            promiseList.push(viPromise);
        }

        Promise.all(promiseList).then(result => {
            dispatch({ type: 'setLoaded', payload: true });
        })
            .catch(error => {
                // retry on error
                setTimeout(() => { fetchBibleJson() }, 3000);
            });
    }
    useEffect(() => {
        dispatch({ type: 'setLoaded', payload: false });
        fetchBibleJson();
    }, [props.text, props.voice, props.tooltip]);

    if (!state.isLoaded) {
        return (<div></div>);
    }
    const { actions, book } = props;
    const b = state.enBible;
    const currentBook = findBook(b, book);
    const bookName = currentBook.name;

    const bibles = {
        EN: state.enBible,
        ENB: state.ennivBible,
        ZH: state.zhBible,
        EL: state.elBible,
        DE: state.deBible,
        FR: state.frBible,
        ES: state.esBible,
        AR: state.arBible,
        KO: state.koBible,
        PT: state.ptBible,
        RO: state.roBible,
        RU: state.ruBible,
        VI: state.viBible
    }

    return (
        <div>
            <h1>{bookName}</h1>
            <br />
            <br />
            <Chapter actions={actions} bibles={bibles} />
            <br />
            <br />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        book: state.ReactBibleReducer.book,
    };
}
export default connect(mapStateToProps)(Book)