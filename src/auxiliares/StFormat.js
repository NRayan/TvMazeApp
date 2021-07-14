export default class StFormat {
    static RemoveTags(string) {
        if (string == null || string == undefined)
            return ''
        else
            return string.replace(/<[^>]*>?/gm, '');
    }
}