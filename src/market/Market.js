import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MarketList from './components/MarketList';
import MarketSearch from './components/MarketSearch';
import MarketData from './components/MarketData';
import axios from 'axios';
import {queries, endpoints} from '../Constants'
import MarketRegions from './components/MarketRegions';
import Navbar from '../navbar/components/Navbar';

function Market(){

  const[marketGroups, setMarketGroups] = useState ([]);
  const[regions, setRegions] = useState(null);
  const[selectedRegion, setSelectedRegion] = useState(null);
  const[selectedMarketItem, setSelectedMarketItem] = useState(null);
  
  useEffect(() => {
      axios.post(endpoints.eveBackend, {
        query: queries.getRegions
        }).then(response => {
          setRegions(response.data.data.getRegions);
        }).catch(error => {
          console.error('GraphQL request failed', error);
      });
      axios.post(endpoints.eveBackend, {
          query: queries.getMarketDetails,
        })
        .then(response => {
          console.log(response.data.data.getMarketDetails)
          setMarketGroups(response.data.data.getMarketDetails);
        })
        .catch(error => {
          console.error('GraphQL request failed', error);
      });
  }, [])

  const handleMarketItemUpdate = (id) => {
    setSelectedMarketItem(id);
  };

  const handleSelectedRegionUpdate = (id) => {
    setSelectedRegion(id);
  }

    return <Box sx={{  }}>
            <Navbar/>
            <Box sx={{ position: 'absolute', top:'15%', left:'25vw', width: '50vw', height: '50vh', display:'flex', flexDirection: 'row', border: 1 }}>              
              <Box sx={{ width:'20%', display:'flex', flexDirection: 'column',overflow: 'auto' }}>
                <MarketRegions regions={regions} selectedRegion={handleSelectedRegionUpdate}/>
                <MarketSearch/>
                {marketGroups && <MarketList marketGroups={marketGroups} handleMarketItemUpdate={handleMarketItemUpdate}/>}
              </Box>
              <Box sx={{ width:'80%', height: '100%', display:'flex'}}>
              <MarketData selectedMarketItem={selectedMarketItem} selectedRegion = {selectedRegion}/>
              </Box>

            </Box>
          </Box>
}

export default Market;