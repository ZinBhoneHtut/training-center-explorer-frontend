import { HttpParams } from "@angular/common/http";
import { QueryCriteria } from "../admin/models/query-criteria.model";

export function queryCriteriaToHttpParam(criteria: QueryCriteria) {
    let params = new HttpParams()
        .set('page', criteria.page??0)
        .set('size', criteria.size??10)
        .set('sort', `${criteria.sortField},${criteria.sortOrder}`);

    for (const filterKey in criteria?.filters) {
        if (criteria.filters.hasOwnProperty(filterKey)) {
            params = params.set(filterKey, criteria.filters[filterKey]);
        }
    }
    return params;
}