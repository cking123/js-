/**
 * 封装的sessionStorage方法
 */

class Storage {
    constructor() {
    }
    getStorage(itemname) {
        var users = sessionStorage.getItem(itemname) || '';
        return users;
    }
    setStorage(itemname, data) {
        sessionStorage.setItem(itemname, data);
    }
}