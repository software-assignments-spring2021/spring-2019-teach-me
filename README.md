# Teach Me
See a live version of the web app [here](https://teach-me-web-app.herokuapp.com/)!

## Description
**Teach Me** is a software project designed to connect users to teach each other creative skills. **Teach Me** provides creatively skilled individuals (musicians, artists etc.) with an additional source of income, while allowing non-skilled individuals to explore skills that they might be interested in learning.

## History
The idea behind **Teach Me** came from observing a simple problem evident in our society today- that while we are often interested in creative pursuits at a young age, as we grow older, we are *encouraged* to set them aside in favor of more financially rewarding activities.

Those who continue to pursue their passions, whether they are dramatic, musical or craft-based in nature, often find themselves experiencing financial hardship. On the other hand, those who choose to focus on maximizing their financial gain are yearning to discover (or rediscover) their creative potential. By connecting these diverse groups of people, **Teach Me** seeks to bridge the gap and help our teachers improve their financial security, and our learners to rekindle their passions for all things creative and fun.

## How to contribute
Thank you for your interest in contributing! Please check out our [contributing guidelines](https://github.com/nyu-software-engineering/teach-me/blob/master/CONTRIBUTING.md) for detailed instructions regarding project contributions. To get a better grasp of what we are trying to accomplish, please also take a look at our [project requirements](https://github.com/nyu-software-engineering/teach-me/blob/master/REQUIREMENTS.md).

## Latest builds status Travis.ci
[![Build Status](https://travis-ci.com/nyu-software-engineering/teach-me.svg?branch=master)](https://travis-ci.com/nyu-software-engineering/teach-me)

## How to build and test
### Build instructions
1. Clone the repository to your local machine using the command line `$ git clone https://github.com/nyu-software-engineering/teach-me.git`
2. Install [nodejs and npm](https://www.npmjs.com/get-npm)
3. Make sure you are inside the repository folder (`$ cd teach-me`)
4. Install the required dependencies: `$ npm install`
5. Build the app: `$ npm run build`
6. Set the required environment variables:
`$ export CLOUDINARY_URL=cloudinary://386634463162269:1Qx9LZsY2bnVye4FopbuU5F3kaM@dezvvcopx/; export DB_URI="mongodb+srv://throwaway-user-1:gLDkfoFApIyyz3Fg@teach-me-zlqgf.mongodb.net/test?retryWrites=true"`
7. Start the local server `$ node app.js`
8. View the application in your browser at http://localhost:9000/.

### Test instructions
1. Follow steps 1-4 of the build instructions above
2. Run the test command `$ npm test`
3. To view test coverage, run the command `$ npm run test-with-coverage`

## Additional links
