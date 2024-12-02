
import fs from 'fs/promises';

export class Account {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllUsers() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.users || [];
    } catch (error) {
      console.error('Error reading user data:', error);
      return [];
    }
  }

  async validateUser(username, password) {
    const users = await this.getAllUsers();
    return users.some(user => user.username === username && user.password === password);
  }

  async addUser(username, password) {
    const users = await this.getAllUsers();
    if (users.some(user => user.username === username)) {
      throw new Error('User already exists');
    }

    users.push({ username, password });
    await this._saveUsers(users);
    console.log('User added successfully!');
  }

  async _saveUsers(users) {
    const data = { users };
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
