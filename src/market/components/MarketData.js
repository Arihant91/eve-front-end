import React, { useEffect, useState }  from 'react';
import MarketOrders from './MarketOrders';
import { endpoints, restVersion } from '../../Constants';
import axios from 'axios';

function MarketData(props) {
    const {selectedMarketItem, selectedRegion } = props;

    return (
    <div style={{ height: '100%', width: '100%' }}>
        <header>sell orders</header>
        <MarketOrders selectedMarketItem={selectedMarketItem} selectedRegion = {selectedRegion} orderType = {'sell'}/>
        <header>buy orders</header>
        <MarketOrders selectedMarketItem={selectedMarketItem} selectedRegion = {selectedRegion} orderType = {'buy'}/>
    </div>
    );
}

export default MarketData;