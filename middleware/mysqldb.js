const fs = require('fs').promises;
const path = require('path');

class MockDB {
    constructor() {
        this.dbPath = path.join(__dirname, '..', '.db.json');
        this.data = {
            users: [],
            permissions: [],
            userPermissions: []
        };
        this.nextId = { users: 1, permissions: 1, userPermissions: 1 };
        this.loadData();
    }

    async loadData() {
        try {
            const data = await fs.readFile(this.dbPath, 'utf8');
            this.data = JSON.parse(data);
            // Update nextId
            this.nextId.users = Math.max(...this.data.users.map(u => u.id), 0) + 1;
            this.nextId.permissions = Math.max(...this.data.permissions.map(p => p.id), 0) + 1;
            this.nextId.userPermissions = Math.max(...this.data.userPermissions.map(up => up.id), 0) + 1;
        } catch (err) {
            // File doesn't exist, use defaults
            await this.saveData();
        }
    }

    async saveData() {
        await fs.writeFile(this.dbPath, JSON.stringify(this.data, null, 2));
    }

    async getUsers() {
        return this.data.users;
    }

    async getUser(id) {
        return this.data.users.find(u => u.id == id) || null;
    }

    async insertUser(data) {
        const id = this.nextId.users++;
        const user = { id, ...data };
        this.data.users.push(user);
        await this.saveData();
        return id;
    }

    async updateUser(id, data) {
        const user = this.data.users.find(u => u.id == id);
        if (user) {
            Object.assign(user, data);
            await this.saveData();
        }
    }

    async deleteUser(id) {
        this.data.users = this.data.users.filter(u => u.id != id);
        await this.saveData();
    }

    async getPermissions() {
        return this.data.permissions;
    }

    async getPermission(id) {
        return this.data.permissions.find(p => p.id == id) || null;
    }

    async insertPermission(data) {
        const id = this.nextId.permissions++;
        const permission = { id, ...data };
        this.data.permissions.push(permission);
        await this.saveData();
        return id;
    }

    async updatePermission(id, data) {
        const permission = this.data.permissions.find(p => p.id == id);
        if (permission) {
            Object.assign(permission, data);
            await this.saveData();
        }
    }

    async deletePermission(id) {
        this.data.permissions = this.data.permissions.filter(p => p.id != id);
        await this.saveData();
    }

    async getUserPermissions() {
        return this.data.userPermissions;
    }

    async getUserPermission(id) {
        return this.data.userPermissions.find(up => up.id == id) || null;
    }

    async insertUserPermission(data) {
        const id = this.nextId.userPermissions++;
        const userPermission = { id, ...data };
        this.data.userPermissions.push(userPermission);
        await this.saveData();
        return id;
    }

    async updateUserPermission(id, data) {
        const userPermission = this.data.userPermissions.find(up => up.id == id);
        if (userPermission) {
            Object.assign(userPermission, data);
            await this.saveData();
        }
    }

    async deleteUserPermission(id) {
        this.data.userPermissions = this.data.userPermissions.filter(up => up.id != id);
        await this.saveData();
    }
}

const DB = new MockDB();
module.exports = DB;
