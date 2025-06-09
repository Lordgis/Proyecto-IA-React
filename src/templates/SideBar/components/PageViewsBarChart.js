import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function AttendanceBarChart({
  title = 'Registro mensual de asistencia',
  subtitle = 'Asistencias, faltas y tardanzas durante los últimos 6 meses',
  mainValue = '1,024',
  chipLabel = '+5%',
  chipColor = 'success',
  months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  series = [
    {
      id: 'attendance',
      label: 'Asistencias',
      data: [950, 970, 990, 1000, 1010, 1020],
      stack: 'A',
    },
    {
      id: 'absences',
      label: 'Faltas',
      data: [20, 15, 10, 12, 8, 6],
      stack: 'A',
    },
    {
      id: 'lateness',
      label: 'Tardanzas',
      data: [10, 14, 12, 8, 6, 5],
      stack: 'A',
    },
  ],
}) {
  const theme = useTheme();
  const colorPalette = [
    '#4caf50', // verde para asistencias
    '#f44336', // rojo para faltas
    '#ff9800', // naranja para tardanzas
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack sx={{ justifyContent: 'space-between', mb: 2 }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              {mainValue}
            </Typography>
            <Chip size="small" color={chipColor} label={chipLabel} />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'band',
              categoryGapRatio: 0.5,
              data: months,
              height: 24,
            },
          ]}
          yAxis={[{ width: 50 }]}
          series={series}
          height={250}
          margin={{ left: 0, right: 0, top: 20, bottom: 0 }}
          grid={{ horizontal: true }}
          hideLegend={false}
        />
      </CardContent>
    </Card>
  );
}
