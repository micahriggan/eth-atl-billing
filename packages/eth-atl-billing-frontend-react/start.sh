#!/bin/bash
export REACT_APP_BILLABLE_WALLET_FACTORY=$(cd ../eth-atl-billing-contracts/blockchain && rm -rf build && npm run deploy | grep "BillableWalletFactory:" | cut -f 4 -d " ") 
echo $REACT_APP_BILLABLE_WALLET_FACTORY
./node_modules/.bin/react-scripts-ts start
