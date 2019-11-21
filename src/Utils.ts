const DefaultWaitTime = 10;

export function debounce(
  func: any,
  wait = DefaultWaitTime,
  immediate = false
): () => void {
  let timeout: NodeJS.Timeout;
  return function(this: any): void {
    const context = this;
    const args = arguments;
    const later = () => {
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}
