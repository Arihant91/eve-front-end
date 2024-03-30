import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid from MUI
import axios from 'axios';
import { endpoints, restVersion, restQuery, dateFormat } from '../index';
import moment from 'moment';

function MarketOrders(props){

    const { onStationIdsChange, selectedMarketItem, selectedRegion, orderType } = props;
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderNotFound, setOrderNotFound] = useState(false);
    
    
    useEffect(() => {
      if (selectedMarketItem && selectedRegion) {
          setLoading(true);
          setOrderNotFound(false);
          const url =
              endpoints.eveTech +
              restVersion.latest +
              restQuery.getMarketItem +
              `${selectedRegion}/orders/?datasource=tranquility&order_type=${orderType}&page=${page}&type_id=${selectedMarketItem}`;
  
          axios.get(url)
              .then(response => {
                  if (response.data.length !== 0) {
                      setItems(response.data);
                  } else {
                      setOrderNotFound(true);
                      setLoading(false);
                  }
              })
              .catch(error => {
                  console.error(`failed to fetch orderType=${orderType} and ItemId=${selectedMarketItem}`, error);
              });
      }
  }, [selectedMarketItem, selectedRegion]);
  
  useEffect(() => {
    if (items) {
        items.forEach(item => {
            item['expiry'] = moment(item.issued).add(90, 'days').format(dateFormat)
            item.issued = moment(item.issued).format(dateFormat);
        })
  
        const stationIDs = [];
        items.forEach(item => {
            const locationIdString = String(item.location_id);
            if (locationIdString.length <= 8) {
                stationIDs.push(item.location_id);
            }
        });
        onStationIdsChange(stationIDs, orderType);
        
        setLoading(false);
           
    }
  }, [items]);

  useEffect(() => {
    console.log('im being called')
    if(props.stationsData && props.stationsData.length > 0){
        items.forEach(item => {
            item['category'] = props.stationsData[item.location_id].category
            item['name'] = props.stationsData[item.location_id].name
        })
    }
    console.log(items)
}, [props.stationsData]);
  
  const columns = [
    { field: 'category', headerName: 'Type', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'volume_remain', headerName: 'Volume Remain', flex: 1 },
    { field: 'volume_total', headerName: 'Volume Total', flex: 1 },
    { field: 'expiry', headerName: 'Expiry', flex: 1 },
    { field: 'issued', headerName: 'Issued', flex: 1 },
  ];
  
  return (
    <div style={{ height: '50%', width: '100%' }}>
        {loading ? <p>loading...</p>: orderNotFound ?  <p>there are no sell orders</p>:
        <DataGrid
        rows={items}
        columns={columns}
        loading={loading}
        pageSize={50}
        pageSizeOptions={[]}
        disableSelectionOnClick 
            getRowId={(row) => row.order_id}
        />
  }
    </div>
  );



}


export default MarketOrders;