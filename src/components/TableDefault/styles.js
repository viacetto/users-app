import styled from '@emotion/styled';
import { Table } from '@mui/material';
export const StyledTable = styled(Table)(({ theme }) => (
    {
        minWidth: 650,
        '& tbody tr:last-child td, &:last-child th': {
            border: 0,
        },
        '& thead th': {
            fontWeight: "bold",
            color: theme.palette.primary.contrastText
        },
        '& thead': {
            backgroundColor: theme.palette.primary.main,
        },
        '& .edit_btn': {
            color: theme.palette.primary.main,
        },
        '& .delete_btn': {
            color: theme.palette.error.main,
        },
    }
));