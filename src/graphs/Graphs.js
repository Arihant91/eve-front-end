import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '../navbar/components/Navbar';
import axios from 'axios';
import { endpoints, queries } from '../Constants';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, LineChart } from 'recharts';
import OrdersDataForm from './OrdersDataForm'; 

function Graphs() {
  const [ordersMean, setOrdersMean] = useState([]);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState(null);
  const [items, setItems] = useState(null)

  useEffect(() => {
    let regionsResp =  false;
    let itemsResp = false;
    const fetchData = async () => {
      try {
        const response = await axios.post(endpoints.eveBackend, { query: queries.getRegions });
        if (response.data && response.data.data && response.data.data.getRegions) {
          setRegions(response.data.data.getRegions);
          regionsResp = true;
        } else {
          console.error('Error fetching regions: unexpected data format', response.data);
          regionsResp = true;
        }
  
        const resp =  await axios.post(endpoints.eveBackend, { query: queries.getAllItems });
        if (resp.data && resp.data.data  && resp.data.data.getAllItems){
          setItems(resp.data.data.getAllItems);
          itemsResp = true;
        }   else {
          console.error('Error fetching items: unexpected data format', response.data);
          itemsResp = true;
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      
      }
      
      if(itemsResp && regionsResp){
        setLoading(false);
      }
        };

    if (!regions) {
      fetchData();
    }
  }, [regions]);

  useEffect(() => {
    const fetchOrdersMean = async () => {
      if (!formData) return;

      try {
        const query = queries.getOrdersStatsByRegion
          .replace("$regionId", formData.selectedRegionNames.join(','))
          .replace("$typeId", formData.selectedTypeNames)
          .replace("$isBuyOrder", formData.isBuyOrder)
          .replace("$startDate", String(formData.formattedStartDateTime))
          .replace("$endDate", String(formData.formattedEndDateTime));
        const response = await axios.post(endpoints.eveBackend, { query });
        if (response.data && response.data.data && response.data.data.getOrdersStatsByRegion) {
          setOrdersMean(response.data.data.getOrdersStatsByRegion);
        } else {
          console.log(response)
          console.error('Error fetching orders: unexpected data format', response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrdersMean();
  }, [formData]);

  const handleFormSubmit = (data) => {
    console.log(data)
    setFormData(data);
  };

  return (
    <Box>
      <Navbar />
      {!loading ? (
        <>
          <Typography variant="h5" gutterBottom>Orders Data</Typography>
          <OrdersDataForm onSubmit={handleFormSubmit} regions={regions} types={items}/>
          
          {ordersMean.length > 0 && (
            <>
              <Typography variant="h6" gutterBottom>Average Price</Typography>
              <LineChart width={800} height={400} data={ordersMean}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeOfScraping" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgPrice" stroke="#8884d8" />
              </LineChart>

              <Typography variant="h6" gutterBottom>Highest Price</Typography>
              <LineChart width={800} height={400} data={ordersMean}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeOfScraping" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="highestPrice" stroke="#82ca9d" />
              </LineChart>

              <Typography variant="h6" gutterBottom>Lowest Price</Typography>
              <LineChart width={800} height={400} data={ordersMean}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeOfScraping" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="lowestPrice" stroke="#ffc658" />
              </LineChart>

              <Typography variant="h6" gutterBottom>Order Count</Typography>
              <LineChart width={800} height={400} data={ordersMean}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeOfScraping" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orderCount" stroke="#ff7300" />
              </LineChart>

              <Typography variant="h6" gutterBottom>Volume Remain</Typography>
              <LineChart width={800} height={400} data={ordersMean}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeOfScraping" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="volumeRemain" stroke="#0088aa" />
              </LineChart>
            </>
          )}
        </>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Box>
  );
}

export default Graphs;