export function findBook(bible, abbrev){
    if(!bible){
        return null;
    }
    for(let it = 0; it<bible.length; ++it)
    {
        if(bible[it].abbrev === abbrev)
        {
            return bible[it];
        }
    }
    return null;
}

export function findNextBook(bible, abbrev){
    if(!bible){
        return null;
    }    
    for(let it = 0; it<bible.length; ++it)
    {
        if(bible[it].abbrev === abbrev)
        {
            return bible[it+1];
        }
    }
    return null;
}

export function findPrevBook(bible, abbrev){
    if(!bible){
        return null;
    }    
    for(let it = 0; it<bible.length; ++it)
    {
        if(bible[it].abbrev === abbrev)
        {
            if(it>0) {
                return bible[it-1];
            }
        }
    }
    return null;
}