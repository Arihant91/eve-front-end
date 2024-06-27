import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '../navbar/components/Navbar';
import axios from 'axios';
import { endpoints, queries } from '../Constants';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, LineChart } from 'recharts';
import OrdersMeanForm from './OrdersMeanForm'; // Make sure to adjust the import path

function Graphs() {
  const [ordersMean, setOrdersMean] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchOrdersMean = async () => {
      if (!formData) return;

      try {
        const query = queries.getOrdersMeanInRegion
          .replace("$regionId", formData.regionId)
          .replace("$typeId", formData.typeId)
          .replace("$isBuyOrder", formData.isBuyOrder)
          .replace("$startDate", String(formData.formattedStartDateTime))
          .replace("$endDate", String(formData.formattedEndDateTime))
        const response = await axios.post(endpoints.eveBackend, { query });
        if (response.data && response.data.data && response.data.data.getOrdersMeanInRegion) {
          setOrdersMean(response.data.data.getOrdersMeanInRegion);
          console.log(response.data.data.getOrdersMeanInRegion);
        } else {
          console.error('GraphQL request returned unexpected data:', response.data);
        }
      } catch (error) {
        console.error('GraphQL request failed:', error);
      }
    };

    fetchOrdersMean();
  }, [formData]);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Box>
      <Navbar />
      <Typography variant="h5" gutterBottom>Orders Mean Data</Typography>
      <OrdersMeanForm onSubmit={handleFormSubmit} />
      
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
    </Box>
  );
}

export default Graphs;
