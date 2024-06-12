# Token Swaps

This simple web app helps you to track crypto currencies by enabling you to view token history in interactive ways as well as see the price updates in real time. It also allows users to swap tokens on the Polygon network (as of now).

## How to run the app

1. Clone the repository

```bash
git clone https://github.com/Suhel-Kap/token-swaps.git
```

2. Copy the `.env.example` file to `.env.local` and fill in the required details

```bash
cp .env.example .env
```

3. Install the dependencies

```bash
yarn install
```

4. Start the app

```bash
yarn build && yarn start
```

5. Open the app in your browser

```bash
http://localhost:3000
```

## Packages used

- [Next.js](https://nextjs.org/) - A fullstack React framework
- [Shadcn](https://ui.shadcn.com/) - A simple and lightweight component library that gives developers full control over the components
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Rainbow Kit](https://www.rainbowkit.com/) - Enables users to connect their wallets and interact with the blockchain via the connected dapp
- [Iron Session](https://get-iron-session.vercel.app/) - Secure, stateless, and cookie-based session library for JavaScript
- [Viem](https://viem.sh) - A simple and lightweight library that enables users to interact with the blockchain
- [Lightweight Charts](https://www.tradingview.com/lightweight-charts/) - A simple charting library that provides interactive charts for users to view token history
- [SIWE](https://docs.login.xyz/) - It  is a form of authentication that enables users to control their digital identity with their Ethereum account

## Features

- See token history at a glance on the home page. Here, users can see the current price of the token, the price change in the last 24 hours.
- Upon navigating to the token page, users can see the token history in an interactive way. They are presented with the option to see the token performance in the past 1 minute, 15 minutes, 1 hour, 4 hours, 1 day and 1 week in a line chart or candlestick chart.
- A "Live Mode" button is available on the token page that enables users to see the token price updates in real time. The prices are udpated in real time based on the time interval selected by the user. A websocket connection is estabilshed with Kraken to get the real time price updates.
- Users can navigate to the "Trade" page from the landing page or the token page.
- Next JS's intercepting and parallel routing features are used to give a seamless UX, wherein on clicking the "Trade" button a modal is opened that shows the trade dialog. It seems to the user that the page has not changed, but in reality, the user has been navigated to the "Trade" page. This enables users to even share the link to the trade page while still being on the token page or the landing page.
- Users can swap tokens on the Polygon network. The routing is facilitated using Bungee APIs to get the transaction data based on the user input. Once the user agrees to move ahead with the transaciton, the data returned from Bungee API is passed to the Viem library to execute the transaction on the Polygon network.
- Users need to be connected to their wallets to execute the transaction. The wallet connection is facilitated using the Rainbow Kit library. Upon connecting the wallet, the user is prompted to sign a message to authenticate themselves. This is done using the SIWE library.
- The swap API route utilises the authentication provided by Iron Session to ensure that only authenticated users can execute the transaction.
- Dark mode / light mode is available for the users to toggle between the two modes. The system preference is used to set the default mode for the user.
- The app is responsive and works well on mobile devices as well.

## API Routes

User authentication routes are available in the `src/app/api/(auth)` directory. The routes are as follows:

- `/api/nonce` - This route is used to get the nonce from the SIWE library for the user to sign and authenticate themselves.
- `/api/verify` - This route is used to verify that the signature was made over the nonce provided by the server.
- `/api/me` - This route is used to get the user's address from the Iron Session after they have authenticated themselves. This is used at the time of page load to check if the user is authenticated.
- `/api/logout` - This route is used to log the user out of the session.

Swap API routes are available in the `src/app/api/(swap)` directory. The routes are as follows:

- `/api/quote` - This route takes in data like the token to swap from, the token to swap to, the amount to swap. It then calls the Bungee API to get the transaction data based on the user input.
- `/api/checkAllowance` - This route takes in the token address, the target address and the user address. It then returns the allowance of the target address to the user address.
- `/api/getApprovalTransactionData` - This route takes in the token address, the target address, the user address and the amount to approve. It then returns the transaction data to approve the token for the target address.
- `/api/routeTransactionData` - This takes in the route details received from Bungee API via the `/api/quote` route. It then returns the transaction data to execute the swap on the requested network.


## Screenshots

### Home Page

|![Home Page](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/landing.png)|
|:--:|
| *Home Page* |

|![Connect Wallet Modal](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/connect-wallet-modal.png)|
|:--:|
| *Connect Wallet Modal* |

|![Sign Message Modal](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/sign-message-modal.png)|
|:--:|
| *Sign Message Modal* |

|![Sign Mssage Wallet](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/sign-message-wallet.png)|
|:--:|
| *Sign Message Wallet* |

|![Trade Modal From Home](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/trade-modal-from-home.png)|
|:--:|
| *Trade Modal From Home* |

### Token Page

|![Fifteen Min Line Chart](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/fifteen-min-line-chart.png)|
|:--:|
| *Fifteen Min Line Chart* |

|![Four Hour Candle Chart Dark](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/four-hour-candle-chart-dark.png)|
|:--:|
| *Four Hour Candle Chart Dark* |

|![Trade Modal Filled Coin Page Dark](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/trade-modal-filled-coin-page-dark.png)|
|:--:|
| *Trade Modal Filled Coin Page Dark* |

### Trade Page

|![Trade Page Filled](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/trade-page-filled.png)|
|:--:|
| *Trade Page Filled* |

|![Approval Required](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/approval-required.png)|
|:--:|
| *Approval Required* |

|![Approve Token Wallet](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/approve-token-wallet.png)|
|:--:|
| *Approve Token Wallet* |

|![Approve Token Data Wallet](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/approve-token-data-wallet.png)|
|:--:|
| *Approve Token Data Wallet* |

|![Sign Required Before Swap](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/sign-required-before-swap.png)|
|:--:|
| *Sign Required Before Swap* |

|![Confirm Swap Wallet](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/confirm-swap-wallet.png)|
|:--:|
| *Confirm Swap Wallet* |

|![Swap Wait Confirmation](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/swap-wait-confirmation.png)|
|:--:|
| *Swap Wait Confirmation* |

|![Swap Confirmed](https://raw.githubusercontent.com/Suhel-Kap/token-swaps/main/public/screenshots/swap-confirmed.png)|
|:--:|
| *Swap Confirmed* |

Transaction success [URL](https://polygonscan.com/tx/0x03a827b895ed10854ef1d4f5ae4601e7f972a363341fffdca2e1cd560ccf7086)
