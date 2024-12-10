export function parseFragmentString(fragmentString: string) {
    const params: { [key: string]: string } = {};
    const regex = /([^&=]+)=([^&]*)/g;
    let m: RegExpExecArray | null;
  
    while ((m = regex.exec(fragmentString)) !== null) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
  }
  
  export function saveOAuthParams(params: { [key: string]: string }) {
    localStorage.setItem('oauth2-params', JSON.stringify(params));
  }
  
  export function getSavedOAuthParams() {
    return JSON.parse(localStorage.getItem('oauth2-params') || '{}');
}