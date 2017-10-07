/**
 * Created by kevinqian on 10/7/17.
 */
class UserEntry {
    constructor(type, enabled, info) {
        this.type = type;
        this.enabled = enabled;
        this.info = info;
    }

    static fromObject(obj) {
        return new UserEntry(obj.type, obj.enabled, obj.info);
    }

    toObject() {
        return {
            type: this.type,
            enabled: this.enabled,
            info: this.info
        }
    }
}


class UserStruct {
    constructor(username, password, globalEnabled = true, entries = []) {
        this.username = username;
        this.password = password;
        this.globalEnabled = globalEnabled;
        this.entries = entries;
    }

    static fromObject(obj) {
        return new UserStruct(obj.username, obj.password, obj.globalEnabled, obj.entries.map((e) => {
            return UserEntry.fromObject(e);
        }));
    }

    toObject() {
        return {
            username: this.username,
            password: this.password,
            globalEnabled: this.globalEnabled,
            entries: this.entries.map((e) => {
                return e.toObject();
            })
        };
    }
}

module.exports = {
    UserEntry: UserEntry,
    UserStruct: UserStruct
};