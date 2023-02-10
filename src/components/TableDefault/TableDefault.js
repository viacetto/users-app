import DeleteIcon from '@mui/icons-material/Delete';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Typography } from '@mui/material';
import FormDialog from '../Forms/FormDialog.js';
import { StyledTable } from './styles.js';
export const TableDefault = ({ data, userDelete, userEdit }) => {
    return (
        <>
            <TableContainer component={Paper}>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">id</TableCell>
                            <TableCell align="center">name</TableCell>
                            <TableCell align="center">surname</TableCell>
                            <TableCell align="center">mail</TableCell>
                            <TableCell align="center">actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length !== 0 ? data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.surname}</TableCell>
                                <TableCell align="center">{row.mail}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => userDelete(row.id)} className="delete_btn">
                                        <DeleteIcon />
                                    </IconButton>
                                    <FormDialog type="edit" userEdit={userEdit} row={row}></FormDialog>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow>
                            <TableCell align="center" colSpan={5}>
                                <Typography color="grey" variant="subtitle1">
                                    nothing to show yet.
                                </Typography>
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </>
    )
}