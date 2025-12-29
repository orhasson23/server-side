class MockDB {
    constructor() {
        this.users = [];
        this.permissions = [];
        this.userPermissions = [];
        this.nextId = { users: 1, permissions: 1, userPermissions: 1 };
    }

    async getUsers() {
        return this.users;
    }

    async getUser(id) {
        return this.users.find(u => u.id == id) || null;
    }

    async insertUser(data) {
        const id = this.nextId.users++;
        const user = { id, ...data };
        this.users.push(user);
        return id;
    }

    async updateUser(id, data) {
        const user = this.users.find(u => u.id == id);
        if (user) {
            Object.assign(user, data);
        }
    }

    async deleteUser(id) {
        this.users = this.users.filter(u => u.id != id);
    }

    async getPermissions() {
        return this.permissions;
    }

    async getPermission(id) {
        return this.permissions.find(p => p.id == id) || null;
    }

    async insertPermission(data) {
        const id = this.nextId.permissions++;
        const permission = { id, ...data };
        this.permissions.push(permission);
        return id;
    }

    async updatePermission(id, data) {
        const permission = this.permissions.find(p => p.id == id);
        if (permission) {
            Object.assign(permission, data);
        }
    }

    async deletePermission(id) {
        this.permissions = this.permissions.filter(p => p.id != id);
    }

    async getUserPermissions() {
        return this.userPermissions;
    }

    async getUserPermission(id) {
        return this.userPermissions.find(up => up.id == id) || null;
    }

    async insertUserPermission(data) {
        const id = this.nextId.userPermissions++;
        const userPermission = { id, ...data };
        this.userPermissions.push(userPermission);
        return id;
    }

    async updateUserPermission(id, data) {
        const userPermission = this.userPermissions.find(up => up.id == id);
        if (userPermission) {
            Object.assign(userPermission, data);
        }
    }

    async deleteUserPermission(id) {
        this.userPermissions = this.userPermissions.filter(up => up.id != id);
    }
}

const DB = new MockDB();
module.exports = DB;
