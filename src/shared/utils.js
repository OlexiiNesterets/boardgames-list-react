export const pipe = (...fns) => (...val) => {
    return fns.reduce((acc, current) => {
        if (Array.isArray(acc)) {
            return current(...acc);
        }
        return current(acc);
    }, val);
};

export const pick = (prop) => (...objs) => objs.map(obj => obj[prop]);

export const nullToInfinity = (...vals) => {
    if (vals.length === 1) {
        return vals[0] || Infinity;
    }
    return vals.map(val => val || Infinity);
};

export const compare = (a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
};

export const sortDirection = (direction) => (val) => val * (direction ? 1 : -1);

export const fitRange = (filterVal, minRangeProp, maxRangeProp) => (obj) => {
    if (!Number(filterVal)) return true;
    return (filterVal >= obj[minRangeProp]) && (filterVal <= nullToInfinity(obj[maxRangeProp]));
}