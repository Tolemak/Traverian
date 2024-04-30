import inquirer from 'inquirer';
import { availableCryptos } from './availableCryptos.js';

class CryptoTracker {
    constructor(availableCryptos) {
        this.portfolio = [];
    }

    async run() {
        console.log("Welcome to CryptoTracker!");

        await this.selectCryptos();
        await this.setPortfolioPercentages();

        console.log("Your portfolio has been updated successfully!");
        console.log("Here's your current portfolio:");
        this.displayPortfolio();
    }

    async selectCryptos() {
        console.log("Select your favorite cryptocurrencies from the list:");
        this.availableCryptos = await availableCryptos()

        const cryptoChoices = this.availableCryptos.map(crypto => ({
            name: `${crypto.name} (${crypto.symbol})`,
            value: crypto
        }));

        const answers = await inquirer.prompt({
            type: 'checkbox',
            name: 'selectedCryptos',
            message: 'Choose your favorite cryptocurrencies:',
            choices: cryptoChoices
        });

        this.portfolio = answers.selectedCryptos.map(crypto => ({ crypto, percentage: 0 }));
    }

    async setPortfolioPercentages() {
        for (const item of this.portfolio) {
            const answer = await inquirer.prompt({
                type: 'number',
                name: 'percentage',
                message: `Enter the percentage participation for ${item.crypto.name} (${item.crypto.symbol}):`,
                validate: value => {
                    const num = parseFloat(value);
                    return !isNaN(num) && num >= 0 && num <= 100;
                }
            });

            item.percentage = answer.percentage;
        }
    }

    displayPortfolio() {
        this.portfolio.forEach(item => {
            console.log(`${item.crypto.name} (${item.crypto.symbol}): ${item.percentage}%`);
        });
    }
}

// Initialize and run the CryptoTracker app
const cryptoTracker = new CryptoTracker(availableCryptos);
cryptoTracker.run().catch(console.error);
