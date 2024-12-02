
import { Account } from './src/Account.mjs';
import { Getinput } from './src/Readinput.mjs';

const accountManager = new Account('./data/data.json');

async function main() {
  console.log('Welcome to AUTHJS!');
  console.log('1. Log in');
  console.log('2. Sign up');
  const choice = await Getinput('Choose an option (1/2): ');

  if (choice === '1') {
    const username = await Getinput('Enter username: ');
    const password = await Getinput('Enter password: ');

    const isValid = await accountManager.validateUser(username, password);
    if (isValid) {
      console.log('Login successful!');
    } else {
      console.log('Invalid username or password.');
    }
  } else if (choice === '2') {
    const username = await Getinput('Enter a new username: ');
    const password = await Getinput('Enter a new password: ');

    try {
      await accountManager.addUser(username, password);
    } catch (error) {
      console.error(error.message);
    }
  } else {
    console.log('Invalid option. Please restart the program.');
  }
}

main().catch(err => console.error('An error occurred:', err));
