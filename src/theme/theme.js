import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#3f6281',
          light: '#87a8c5',
          dark: 'rgb(44, 68, 90)',
          contrastText: '#dbe6ea',
        },
        secondary: {
          main: '#88a8c3',
          light: 'rgb(159, 185, 207)',
          dark: 'rgb(95, 117, 136)',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        background: {
          default: '#dbe6ea',
          paper: '#ececef',
        },
        text: {
          primary: 'rgba(27,27,32,0.87)',
          secondary: 'rgba(47,47,47,0.6)',
          disabled: 'rgba(160,160,160,0.38)',
        },
        error: {
          main: '#832d2e',
          light: 'rgb(155, 87, 87)',
          dark: 'rgb(91, 31, 32)',
          contrastText: '#fff',
        },
        warning: {
          main: '#a49b2f',
          light: 'rgb(182, 175, 88)',
          dark: 'rgb(114, 108, 32)',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        info: {
          main: '#3f817a',
          light: 'rgb(101, 154, 148)',
          dark: 'rgb(44, 90, 85)',
          contrastText: '#fff',
        },
        success: {
          main: '#4c813f',
          light: 'rgb(111, 154, 101)',
          dark: 'rgb(53, 90, 44)',
          contrastText: '#fff',
        },
      },
});