import * as React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles'
import MarketBrowse from './components/MarketBrowse';
import MarketSearch from './components/MarketSearch';
import MarketData from './components/MarketData';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 5,
  borderColor: 'text.primary',
  width: '5rem',
  height: '5rem',
  display: 'flex',
};

function Market(){
    return <Box sx={{  }}>
            <Box sx={{ position: 'absolute', top:'30px', left:'25vw', width: '50vw', height: '50vh', display:'flex', flexDirection: 'row', border: 1 }}>              
              <Box sx={{ width:'30%', display:'flex', flexDirection: 'column' }}>
                <MarketSearch/>
                <MarketBrowse/>
              </Box>
              <Box sx={{ width:'70%', display:'flex'}}>
              <MarketData/>
              </Box>

            </Box>
          </Box>
}

export default Market;