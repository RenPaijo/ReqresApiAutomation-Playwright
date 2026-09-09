// Automated Report Generator
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n===============================');
console.log('?? Generating Test Reports');
console.log('===============================\n');

try {
    const testReportPath = 'tests/report/cucumber-report.json';
    
    if (!existsSync(testReportPath)) {
        console.error('? No test report found! Run tests first.');
        process.exit(1);
    }
    
    const report = JSON.parse(readFileSync(testReportPath, 'utf8'));
    
    // Compute summary
    let scenarioCount = 0, passedCount = 0, failedCount = 0, skippedCount = 0;
    
    for (const feature of report) {
        for (const element of feature.elements || []) {
            if (element.type === 'background') continue;
            scenarioCount++;
            
            const hasFailed = element.steps?.some(s => s.result?.status === 'failed');
            if (hasFailed) {
                failedCount++;
            } else {
                passedCount++;
            }
        }
    }
    
    console.log('?? Test Summary:');
    console.log(`   Total Scenarios: ${scenarioCount}`);
    console.log(`   Passed: ${passedCount}`);
    console.log(`   Failed: ${failedCount}`);
    console.log(`   Skipped: ${skippedCount}`);
    
    if (failedCount > 0) {
        console.log('\n?? Some tests FAILED! ❌');
    } else {
        console.log('\n? All tests PASSED! 🎉');
    }
    
    // Generate HTML report
    generateHtmlReport(report, { scenarioCount, passedCount, failedCount, skippedCount });
    
    // Generate Allure report
    console.log('\n===============================');
    console.log('?? Generating Allure Report');
    console.log('===============================\n');
    
    try {
        if (existsSync('allure-results')) {
            execSync('npx allure generate allure-results --clean -o allure-report', { stdio: 'inherit' });
            console.log('\n? Allure Report Generated: allure-report/index.html\n');
            console.log('   To view: npx allure serve allure-results --port 4000\n');
            
            // Try to open in browser
            setTimeout(() => {
                try {
                    execSync('start allure-report\\index.html', { stdio: 'ignore' });
                } catch (e) {
                    // Ignore browser open errors
                }
            }, 1500);
        } else {
            console.warn('? No allure-results folder found.\n');
        }
    } catch (error) {
        console.error('? Error generating allure report:', error.message);
    }
    
} catch (error) {
    console.error('? Error:', error.message);
    console.error(error.stack);
}

function generateHtmlReport(data, summary) {
    const htmlDir = 'tests/report/html-report';
    if (!existsSync(htmlDir)) {
        mkdirSync(htmlDir, { recursive: true });
    }
    
    let tableRows = '';
    for (const feature of data) {
        for (const element of feature.elements || []) {
            if (element.type === 'background') continue;
            
            const steps = element.steps || [];
            let stepStatus = 'All Passed ✅';
            let statusClass = 'PASSED ✅';
            let statusColor = 'green';
            
            const failedSteps = steps.filter(s => s.result?.status === 'failed');
            if (failedSteps.length > 0) {
                stepStatus = `${steps.filter(s => s.result?.status === 'passed').length}P / ${failedSteps.length}F`;
                statusClass = 'FAILED ❌';
                statusColor = 'red';
            }
            
            tableRows += `
<tr>
    <td>${feature.name.split('/').pop().replace('.feature', '')}</td>
    <td>${element.name}</td>
    <td style="color:${statusColor}; font-weight:bold;">${statusClass}</td>
    <td>${stepStatus}</td>
</tr>`;
        }
    }
    
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Cucumber Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
        .summary { display: flex; gap: 20px; margin: 30px 0; }
        .stat { padding: 20px; border-radius: 8px; text-align: center; min-width: 120px; }
        .passed { background: #d4edda; color: #155724; }
        .failed { background: #f8d7da; color: #721c24; }
        .skipped { background: #fff3cd; color: #856404; }
        .total { background: #cce5ff; color: #004085; }
        .status { font-size: 2em; font-weight: bold; }
        .label { font-size: 0.9em; color: #666; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #007bff; color: white; }
        tr:hover { background: #f5f5f5; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 Cucumber Test Report</h1>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        
        <div class="summary">
            <div class="stat total"><div class="status">${summary.scenarioCount}</div><div class="label">Total Scenarios</div></div>
            <div class="stat passed"><div class="status">${summary.passedCount}</div><div class="label">Passed ✅</div></div>
            <div class="stat failed"><div class="status">${summary.failedCount}</div><div class="label">Failed ❌</div></div>
            <div class="stat skipped"><div class="status">${summary.skippedCount}</div><div class="label">Skipped ⏭️</div></div>
        </div>
        
        <h2 style="margin-top: 40px;">Features & Scenarios</h2>
        <table>
            <thead><tr><th>Feature File</th><th>Scenario Name</th><th>Status</th><th>Steps Status</th></tr></thead>
            <tbody>${tableRows}</tbody>
        </table>
    </div>
</body>
</html>`;
    
    writeFileSync(`${htmlDir}/index.html`, html);
    console.log('\n? HTML Report Generated: tests/report/html-report/index.html\n');
    console.log('   To open: start tests\\report\\html-report\\index.html\n');
}
