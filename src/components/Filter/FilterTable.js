export default class Filter{

    static byIndex({
        index= [],
        search = '',
    }) {
        try {
            if (index.length <= 0) {
                throw Error('Index Cannot be Empty')
            }
            index = index.join(',').toLowerCase()
            return search.split(' ').every((e) => index.includes(e.toLowerCase()));
        } catch (error) {
            throw Error(error.message)
        }
    }

}