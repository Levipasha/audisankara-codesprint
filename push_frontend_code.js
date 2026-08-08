const { execSync } = require('child_process');

try {
  console.log('Staging frontend files...');
  execSync('git add .', { stdio: 'inherit' });

  console.log('Committing changes...');
  execSync('git commit -m "Add official Problem Statement PDF specification document and print/download feature to user dashboard"', { stdio: 'inherit' });

  console.log('Pushing frontend to GitHub (origin main)...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('Successfully pushed frontend code to repository!');
} catch (err) {
  console.error('Git Push Error:', err.message);
  process.exit(1);
}
