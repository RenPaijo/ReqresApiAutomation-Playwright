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
        console.log('\n? All tests PASSED! 🎉');
    } else if (report.run.summary.status === 'failed') {
        console.log('\n?? Some tests FAILED! ❌');
        console.log('Check the detailed error messages above.');
    }
    
    // Generate HTML report using allure command line
    console.log('\n===============================');
    console.log('?? Generating Allure Report');
    console.log('===============================\n');
    
    try {
        // Clean and generate allure report
        if (existsSync('allure-results')) {
            execSync('npx allure generate allure-results --clean --project ./allure-results', { stdio: 'inherit' });
            console.log('\n? Allure Report Generated: allure-results/allure-report/index.html');
            console.log('   To view: npx serve -s allure-results/allure-report -l 4000\n');
        } else {
            console.warn('? No allure-results folder found. Please run with allure format.\n');
        }
    } catch (error) {
        console.warn('? Error generating allure report:', error.message);
    }
    
    // Generate Cucumber HTML report
    console.log('\n===============================');
    console.log('?? Generating Cucumber HTML Report');
    console.log('===============================\n');
    
    try {
        execSync('npx cucumber-html-reporter -f tests/report/cucumber-report.json -d tests/report/html-report', { stdio: 'inherit' });
        console.log('\n? Cucumber HTML Report Generated: tests/report/html-report/index.html\n');
        console.log('   To open: start tests\\report\\html-report\\index.html');
    } catch (error) {
        console.warn('? Error generating cucumber HTML report:', error.message);
        console.warn('? Try: npm install --save-dev @cucumber/messages cucumber-html-reporter\n');
    }
    
    console.log('\n===============================');
    console.log('?? Report Generation Complete');
    console.log('===============================\n');
    
} catch (error) {
    console.error('? Error generating reports:', error.message);
    console.error(error.stack);
}
