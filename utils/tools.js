exports.trim = (str)=>{
    var trimLeft = /^\s+/,
        trimRight = /\s+$/;
    return str.replace( trimLeft, "" ).replace( trimRight, "" );
};