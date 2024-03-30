import React, { useEffect, useState }  from 'react';
import MarketOrders from './MarketOrders';
import { endpoints, restVersion } from '../index';
import axios from 'axios';

function MarketData(props) {
    const { selectedMarketItem, selectedRegion } = props;
    const [buyOrderStationIds, setBuyOrderStationIds] = useState([]);
    const [sellOrderStationIds, setSellOrderStationIds] = useState([]);
    const [mergedStationIds, setMergedStationIds] = useState([]);
    const [stationsData, setStationsData] = useState([]);

    useEffect(() => {
        if (buyOrderStationIds.length > 0 && sellOrderStationIds.length > 0){
            const stationIds = new Set();
            buyOrderStationIds.forEach( id => stationIds.add(id));
            sellOrderStationIds.forEach( id => stationIds.add(id));

            setMergedStationIds(Array.from(stationIds));
        }
    }, [buyOrderStationIds, sellOrderStationIds]);

    useEffect(() => {
        const url = endpoints.eveTech + restVersion.latest + `universe/names/?datasource=tranquility`;
        if(mergedStationIds.length > 0){
            axios.post(url, mergedStationIds)
                .then(response => {
                    setStationsData(response.data);
                    console.log(stationsData)
                })
                .catch(error => {
                    console.error('Failed to fetch station names', error);
                });
                setBuyOrderStationIds([]);
                setSellOrderStationIds([]);
        }
    }, [mergedStationIds]);

    useEffect(() => {
            setStationsData(stationsData);
    }, [stationsData])


    const handleChildStationIds = (ids, orderType) => {

        if (orderType === 'buy') {
            setBuyOrderStationIds(ids);
        } else if (orderType === 'sell') {
            setSellOrderStationIds(ids);
        }
    };

    return (
    <div style={{ height: '100%', width: '100%' }}>
        <header>sell orders</header>
        <MarketOrders poi={stationsData} onStationIdsChange={handleChildStationIds} selectedMarketItem={selectedMarketItem} selectedRegion = {selectedRegion} orderType = {'sell'}/>
        <header>buy orders</header>
        <MarketOrders poi={stationsData} onStationIdsChange={handleChildStationIds} selectedMarketItem={selectedMarketItem} selectedRegion = {selectedRegion} orderType = {'buy'}/>
    </div>
    );
}

export default MarketData;