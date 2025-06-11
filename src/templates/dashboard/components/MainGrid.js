import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageViewsBarChart from './PageViewsBarChart';
import StatCard from './StatCard';

const data = [
  {
    title: 'Asistencias del día',
    value: '128',
    interval: 'Hoy',
    trend: 'up',
    data: [4, 6, 10, 15, 20, 22, 18, 25, 28, 30, 27, 26, 32, 30, 29, 28, 32, 35, 34, 38, 40, 42, 45, 47, 49, 51, 55, 58, 60, 62],
  },
  {
    title: 'Faltas registradas',
    value: '37',
    interval: 'Hoy',
    trend: 'down',
    data: [3, 4, 3, 2, 1, 5, 4, 3, 6, 5, 3, 4, 2, 3, 1, 2, 3, 4, 3, 2, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
  },
  {
    title: 'Total mensual',
    value: '2,850',
    interval: 'Junio 2025',
    trend: 'neutral',
    data: [90, 95, 100, 102, 105, 110, 115, 100, 105, 110, 100, 98, 101, 103, 104, 99, 105, 107, 108, 110, 111, 114, 116, 115, 117, 119, 121, 123, 124, 125],
  },
];



export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
      
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
    </Box>
  );
}
