declare const getImageSize: <T extends File, U extends unknown>(file: T) => Promise<U>;
declare const getVideoSize: <T, U>(file: T) => Promise<U>;
export { getImageSize, getVideoSize };
