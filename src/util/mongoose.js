module.exports = {
    multipleMongooseToObject: (array) => {
        return array.map(item=>item.toObject())
    },
    mongooseToObject: (obj) => {
        return obj? obj.toObject():obj
     }
}