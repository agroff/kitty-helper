# Kitty Helper Cyrypto Kitties Extension

A quick extension that adds some features to the crypto kitties website. [See a brief demo here.](https://gfycat.com/gifs/detail/GrotesqueYellowBlowfish)

## How to use it
You have three options, listed from least effort to most effort (also most secure).

1. Download it from the [Chrome Webstore.](https://chrome.google.com/webstore/detail/kitty-helper/dceabgpbnaimhibdgjdhgbabiocgimhb)
2. Load unpacked extension from recent release zip:
    1. Find, download, and unzip the most recent zip in the `releases` folder.
    2. Access `chrome://extensions/`
    3. Check `Developer mode`
    4. Click on `Load unpacked extension`
    5. Select the directory you just unzipped.
3. Build from source. See following section

### Building from source
*I am leaving this section from the Extension Boilerplate I forked. No idea if it really works.*

1. Clone the repository.
2. Install [yarn](https://yarnpkg.com): `npm install -g yarn`.
3. Run `yarn`.
4. Change the package's name and description on `package.json`.
5. Change the name of your extension on `src/manifest.json`.
6. Run `npm run start`
7. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
8. Have fun.

## Contributions
I wont currently accept pull requests with big changes/new features until I finish building out the current vision.
However, bug fixes and new rarity algorithms are more than welcome. 

##Roadmap
I've got big plans for this guy. Here they are in order:
1. Add a dropdown to the marketplace to hide/fadeout low reproduction speeds
2. Implement a "database" layer (probably using `localStorage`) for caching the kitties, ethereum price, and rarity table
3. Finish the popup functionality to allow configuration of plugin behavior
4. Develop more rarity algorithms that users can choose from. 
5. Implement a wallet observer in the popup - listens to transactions from the blockchain and presents them to you in kitty terms.

