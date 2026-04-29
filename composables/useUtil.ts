export function random(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function throttle(delay: number, fn: (...args: any[]) => void) {
  let last = 0;
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - last < delay) {
      return;
    }
    last = now;
    fn(...args);
  };
}

export function debounce(delay: number, fn: (...args: any[]) => void) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function wait(delay: number): Promise<void>{
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function ginkChanComment(): void {
  // console.log("hello!\r\nAAAAAAAAAAC       AAAAAAAAA\r\nAAAAAAAAA DDDDDDD AAAAAAAAA\r\nAAAAAAAAA DDDDDDEOAAAAAAAAA\r\nAAAAAAAAASDDDDDDEAAAAAAAAAA\r\nAAAAAAAA DDDDDDDE  AAAAAAAA\r\nAAAAAA EDDDDDDDDDDDE AAAAAA\r\nAAAA EDDDF EDDDE EDDDE AAAA\r\nAA EDDDDDDDDDDDDDDDDDDDDE A\r\nA EDDDDDDDDDDDDDDDDDDDDDE A\r\nAAAA EDDDDDDDDDDDDDDDDDE AA\r\nAAAAAA EDDE AAA NDDDDDI AAA\r\nAAAAAAAL  AAAAAAA  EEKAAAAA\r\nAAAAAAAA AAAAAAAAAAAAAAAAAA\r\nAAAAAAAAAAAAAAAAAA  AAAAAAA");
}