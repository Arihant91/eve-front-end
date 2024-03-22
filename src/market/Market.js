import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MarketList from './components/MarketList';
import MarketSearch from './components/MarketSearch';
import MarketData from './components/MarketData';
import axios from 'axios';
import {queries, endpoints} from './index'

function Market(){

  const[marketGroups, setMarketGroups] = useState (null);
  const[regions, setRegions] = useState(null);
  
  useEffect(() => {
      axios.post(endpoints.eveBackend, {
        query: queries.getRegions
        }).then(response => {
          setRegions(response.data.data);
          console.log(regions)
        }).catch(error => {
          // Handle errors
          console.error('GraphQL request failed', error);
      });
      axios.post(endpoints.eveBackend, {
          query: queries.getMarketDetails,
        })
        .then(response => {
          // Handle the response
          setMarketGroups(JSON.parse(response.data.data.getMarketDetails));
        })
        .catch(error => {
          // Handle errors
          console.error('GraphQL request failed', error);
      });
  }, [])

    return <Box sx={{  }}>
            <p>something</p>
            <Box sx={{ position: 'absolute', top:'30px', left:'25vw', width: '50vw', height: '50vh', display:'flex', flexDirection: 'row', border: 1 }}>              
              <Box sx={{ width:'20%', display:'flex', flexDirection: 'column',overflow: 'auto' }}>
                <MarketSearch/>
                <MarketSearch/>
                {marketGroups && <MarketList marketGroups={marketGroups}/>}
              </Box>
              <Box sx={{ width:'80%', display:'flex'}}>
              <MarketData/>
              </Box>

            </Box>
          </Box>
}

export default Market;