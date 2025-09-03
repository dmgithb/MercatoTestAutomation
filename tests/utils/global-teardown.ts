import { FullConfig } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global test teardown...');

  try {
    // Clean up any temporary files or test data
    console.log('🗑️ Cleaning up temporary files...');
    
    // Archive test results if in CI
    if (process.env.CI) {
      console.log('📁 Archiving test results...');
      await archiveTestResults();
    }

    // Generate summary report
    if (process.env.GENERATE_SUMMARY === 'true') {
      console.log('📊 Generating test summary...');
      await generateTestSummary();
    }

    // Cleanup screenshots/videos if configured
    if (process.env.CLEANUP_MEDIA === 'true') {
      console.log('🧹 Cleaning up old media files...');
      await cleanupOldMedia();
    }

    console.log('✅ Global teardown completed successfully');
    
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    // Don't throw - teardown failures shouldn't fail the entire test run
  }
}

async function archiveTestResults() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archiveDir = `test-results-archive-${timestamp}`;
    
    // Create archive directory
    await fs.mkdir(archiveDir, { recursive: true });
    
    // Copy results to archive
    const resultsDir = 'test-results';
    const reportDir = 'playwright-report';
    
    if (await directoryExists(resultsDir)) {
      await copyDirectory(resultsDir, path.join(archiveDir, 'results'));
    }
    
    if (await directoryExists(reportDir)) {
      await copyDirectory(reportDir, path.join(archiveDir, 'report'));
    }
    
    console.log(`📁 Test results archived to: ${archiveDir}`);
  } catch (error) {
    console.error('Failed to archive test results:', error);
  }
}

async function generateTestSummary() {
  try {
    const resultsFile = 'test-results/results.json';
    
    if (await fileExists(resultsFile)) {
      const results = JSON.parse(await fs.readFile(resultsFile, 'utf-8'));
      
      const summary = {
        timestamp: new Date().toISOString(),
        stats: results.stats || {},
        config: results.config?.projects?.map((p: any) => p.name) || [],
        environment: {
          baseURL: process.env.BASE_URL,
          headless: process.env.HEADLESS,
          ci: !!process.env.CI
        }
      };
      
      await fs.writeFile(
        'test-results/summary.json', 
        JSON.stringify(summary, null, 2)
      );
      
      console.log('📊 Test summary generated');
    }
  } catch (error) {
    console.error('Failed to generate test summary:', error);
  }
}

async function cleanupOldMedia() {
  try {
    const testResultsDir = 'test-results';
    const maxAgeMs = 7 * 24 * 60 * 60 * 1000; // 7 days
    const now = Date.now();
    
    if (await directoryExists(testResultsDir)) {
      const files = await fs.readdir(testResultsDir, { withFileTypes: true });
      
      for (const file of files) {
        if (file.isFile() && (file.name.endsWith('.webm') || file.name.endsWith('.png'))) {
          const filePath = path.join(testResultsDir, file.name);
          const stats = await fs.stat(filePath);
          
          if (now - stats.mtime.getTime() > maxAgeMs) {
            await fs.unlink(filePath);
            console.log(`🗑️ Deleted old media file: ${file.name}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Failed to cleanup old media files:', error);
  }
}

async function directoryExists(dir: string): Promise<boolean> {
  try {
    await fs.access(dir);
    return true;
  } catch {
    return false;
  }
}

async function fileExists(file: string): Promise<boolean> {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function copyDirectory(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  const files = await fs.readdir(src, { withFileTypes: true });
  
  for (const file of files) {
    const srcPath = path.join(src, file.name);
    const destPath = path.join(dest, file.name);
    
    if (file.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

export default globalTeardown;
