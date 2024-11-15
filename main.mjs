
import { getInput } from './src/readinput.mjs';
import { authenticateUser } from './src/auth.mjs';

(async function main() {
  const username = await getInput('Enter your username: ');
  const password = await getInput('Enter your password: ');

  if (authenticateUser(username, password)) {
    console.log('Authentication successful! Welcome.');
  } else {
    console.log('Authentication failed! Please try again.');
  }
})();
