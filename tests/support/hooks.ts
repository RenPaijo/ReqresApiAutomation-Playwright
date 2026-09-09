import { Before, After } from '@cucumber/cucumber';

Before(function () {
    console.log('\n===============================\n');
});

After(function ({ result }) {
    if (result) {
        console.log('? Scenario Failed\n');
    } else {
        console.log('? Scenario Passed Successfully\n');
    }
});