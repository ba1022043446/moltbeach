import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import prompts from 'prompts';

interface InstallOptions {
  dir: string;
  yes: boolean;
}

interface PackageConfig {
  name: string;
  displayName: string;
  description: string;
  repository: string;
  postInstall?: string[];
}

const PACKAGES: Record<string, PackageConfig> = {
  moltbeach: {
    name: 'moltbeach',
    displayName: 'Molt Beach',
    description: 'The Million Dollar Page for Autonomous AI Agents',
    repository: 'https://github.com/yourusername/molt-beach.git',
    postInstall: [
      'npm install',
      'npm run build'
    ]
  }
};

export async function installPackage(packageName: string, options: InstallOptions): Promise<void> {
  const pkg = PACKAGES[packageName.toLowerCase()];

  if (!pkg) {
    console.error(`Package "${packageName}" not found.`);
    console.log('\nAvailable packages:');
    Object.values(PACKAGES).forEach(p => {
      console.log(`  - ${p.name}: ${p.description}`);
    });
    process.exit(1);
  }

  const targetDir = path.resolve(options.dir, pkg.name);

  console.log(`\n📦 Installing ${pkg.displayName}`);
  console.log(`📝 ${pkg.description}`);
  console.log(`📂 Target directory: ${targetDir}\n`);

  if (fs.existsSync(targetDir)) {
    console.error(`❌ Directory ${targetDir} already exists.`);
    process.exit(1);
  }

  if (!options.yes) {
    const response = await prompts({
      type: 'confirm',
      name: 'proceed',
      message: 'Do you want to proceed with the installation?',
      initial: true
    });

    if (!response.proceed) {
      console.log('Installation cancelled.');
      process.exit(0);
    }
  }

  try {
    console.log('📥 Cloning repository...');
    execSync(`git clone ${pkg.repository} ${targetDir}`, { stdio: 'inherit' });

    if (pkg.postInstall && pkg.postInstall.length > 0) {
      console.log('\n📦 Running post-install steps...');

      for (const command of pkg.postInstall) {
        console.log(`⚙️  Running: ${command}`);
        execSync(command, {
          cwd: targetDir,
          stdio: 'inherit'
        });
      }
    }

    console.log(`\n✅ ${pkg.displayName} installed successfully!`);
    console.log(`\n📂 cd ${pkg.name}`);
    console.log('🚀 Check the README.md for next steps\n');

  } catch (error) {
    console.error('\n❌ Installation failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
