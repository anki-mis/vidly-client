import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {

    const startIndex = (pageNumber-1)*pageSize; // starting index of current page
    //use lodash to pick items from the array starting from startIndex, totalling upto pageSize
    //_.slice(items, startIndex)
    //_.take()
    // but in oredr to use above 2 processes, we need to convert the array to a lodash wrapper object like 
    //_(<array>) , then chain these 2 functions, then chain .value() method convert obj back to array
    return _(items).slice(startIndex).take(pageSize).value();
}