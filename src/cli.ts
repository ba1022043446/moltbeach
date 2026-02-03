#!/usr/bin/env node

import { Command } from 'commander';
import { installPackage } from './commands/install';
import { version } from '../package.json';

const program = new Command();

program
  .name('molthub')
  .description('Package manager for Molt projects')
  .version(version);

program
  .command('install <package>')
  .description('Install a Molt package (e.g., moltbeach)')
  .option('-d, --dir <directory>', 'Installation directory', '.')
  .option('-y, --yes', 'Skip confirmation prompts', false)
  .action(async (packageName: string, options: { dir: string; yes: boolean }) => {
    try {
      await installPackage(packageName, options);
    } catch (error) {
      console.error('Installation failed:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
