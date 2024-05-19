export const isObject = (data: any) => {
    return typeof data === 'object' && !Array.isArray(data) && data !== null;
};
