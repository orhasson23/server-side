class UserPermissionModel {
    constructor(id, user_id, permission_id) {
        this.id = id;
        this.user_id = user_id;
        this.permission_id = permission_id;
    }
}

module.exports = UserPermissionModel;