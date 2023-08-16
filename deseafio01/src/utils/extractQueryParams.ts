export function extractQueryParams(query: string) {
  return query.substring(1).split('&').reduce((queryParams: any, params: string) => {
    const [key, value] = params.split('=');
    queryParams[key] = value;
    return queryParams;
  })
}
