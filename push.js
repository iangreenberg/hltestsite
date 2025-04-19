import { execSync } from 'child_process';

try {
  // Configure Git
  execSync('git config --global user.name "Replit Deployment"');
  execSync('git config --global user.email "deployment@replit.com"');
  
  // Add all changes
  execSync('git add .');
  
  // Commit changes
  try {
    execSync('git commit -m "Update landing page with new design and hemp-products background"');
    console.log('Changes committed successfully');
  } catch (err) {
    console.log('No new changes to commit or commit failed');
  }
  
  // Use environment variable for GitHub token
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    throw new Error('GitHub token not found in environment variables');
  }
  
  // Set the remote URL with the token
  const repoUrl = `https://${token}@github.com/iangreenberg/hltestsite.git`;
  execSync(`git remote set-url origin "${repoUrl}"`);
  
  // Push to GitHub
  execSync('git push origin main');
  
  console.log('Successfully pushed changes to GitHub');
} catch (error) {
  console.error('Error occurred:', error.message);
}