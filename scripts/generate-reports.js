// Automated Report Generator
import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n===============================');
console.log('?? Generating Test Reports');
console.log('===============================\n');

try {
    // Check test results
    const testReportPath = 'tests/report/cucumber-report.json';
    
    if (!existsSync(testReportPath)) {
        console.error('? No test report found! Run tests first.');
        process.exit(1);
    }
    
    const report = JSON.parse(readFileSync(testReportPath, 'utf8'));
    
    console.log('?? Test Summary:');
    console.log(`   Total Scenarios: ${report.run.summary.scenarioCount}`);
    console.log(`   Passed: ${report.run.summary.passedCount}`);
    console.log(`   Failed: ${report.run.summary.failedCount}`);
    console.log(`   Skipped: ${report.run.summary.skippedCount}`);
    
    if (report.run.summary.status === 'passed') {
        console.log('\n? All tests PASSED!');
        console.log('HTML Report: tests/report/html-report/index.html');
        console.log('To open: start tests\\report\\html-report\\index.html');
    } else if (report.run.summary.status === 'failed') {
        console.log('\n?? Some tests FAILED!');
        console.log('Check the detailed error messages above.');
        console.log('Allure Report: npx allure serve tests/report/allure-results');
    }
    
} catch (error) {
    console.error('? Error generating reports:', error.message);
}
