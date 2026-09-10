import { After, Before, setDefaultTimeout, Status } from '@cucumber/cucumber';

setDefaultTimeout(15_000);

Before(function () {
    console.log('\n===============================\n');
});

After(function ({ result }) {
    const status = result?.status ?? Status.UNKNOWN;
    console.log(`[${status.toUpperCase()}] Scenario finished\n`);
});
