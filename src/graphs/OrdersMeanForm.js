import React, { useState } from 'react';
import { Box, Button, TextField, FormControlLabel, Checkbox, MenuItem, FormControl, InputLabel, Select, Grid } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

function OrdersMeanForm({ onSubmit }) {
  const [regionId, setRegionId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [isBuyOrder, setIsBuyOrder] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (regionId && typeId && startDate && endDate && endDate > startDate) {
      const formattedStartDateTime = "\"" + format(startDate, 'yyyy-MM-dd') + " " + format(startTime, 'HH') + "\"";
      const formattedEndDateTime = "\"" + format(endDate, 'yyyy-MM-dd') + " " + format(endTime, 'HH') + "\"";
      console.log(formattedStartDateTime)
      console.log(formattedEndDateTime)
      onSubmit({ regionId, typeId, isBuyOrder, formattedStartDateTime, formattedEndDateTime });
    } else {
      alert('Please fill in all fields and ensure the end date is after the start date');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
        <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
            <TextField
              label="Region ID"
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Type ID"
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={isBuyOrder} onChange={(e) => setIsBuyOrder(e.target.checked)} />}
              label="Is Buy Order"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} required fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                if (newValue >= startDate) {
                  setEndDate(newValue);
                } else {
                  setEndDate(null);
                  alert('End date must be after start date');
                }
              }}
              renderInput={(params) => <TextField {...params} required fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              renderInput={(params) => <TextField {...params} required fullWidth />}
              views={['hours']}
              ampm={false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={(newValue) => {
                if (newValue > startTime) {
                  setEndTime(newValue);
                } else {
                  setEndTime(null);
                  alert('End time must be after start time');
                }
              }}
              renderInput={(params) => <TextField {...params} required fullWidth />}
              views={['hours']}
              ampm={false}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Get Orders Mean
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}

export default OrdersMeanForm;