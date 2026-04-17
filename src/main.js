let d = 1;

const nativeUTC = Date.UTC;
Date.UTC = function(year, month, day) {
    if (arguments.length === 3) {
        if (month === 0 && day === 0) {
            return 0; 
        }
        return d * 86400000;
    }
    return nativeUTC.apply(this, arguments);
};

setInterval(() => d++, 1000);