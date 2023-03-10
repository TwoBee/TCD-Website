export const useLinkhandling = (el) =>{
    const url = el.cached_url ? el.cached_url: el.url;
    const label = el.title === undefined ? el.cached_url: el.title;
    return {url, label};
}