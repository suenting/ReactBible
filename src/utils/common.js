export function findBook(bible, abbrev){
    for(let it = 0; it<bible.length; ++it)
    {
        if(bible[it].abbrev === abbrev)
        {
            return bible[it];
        }
    }
}

export function findNextBook(bible, abbrev){
    for(let it = 0; it<bible.length; ++it)
    {
        if(bible[it].abbrev === abbrev)
        {
            return bible[it+1];
        }
    }
}