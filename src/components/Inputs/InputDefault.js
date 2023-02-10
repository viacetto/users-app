import { TextField } from "@mui/material"

export const InputDefault = (props) => {
    return (
        <TextField
            {...props}
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
        />
    )
}