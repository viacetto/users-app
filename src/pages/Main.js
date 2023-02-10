import axios from "axios";
import { useEffect, useState } from "react";
import FormDialog from "../components/Forms/FormDialog.js";
import SimpleBackdrop from "../components/SimpleBackdrop/SimpleBackdrop.js";
import { TableDefault } from "../components/TableDefault/TableDefault.js";
import { addUser, deleteUser, editUser, getUsers } from "../tools/endpoints.js";
import { useSnackbar } from 'notistack';

export const Main = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    //users get
    const usersGet = () => {
        setOpen(true);
        axios.get(getUsers)
            .then(res => {
                setData(res.data)
                setOpen(false);
            }).catch(function (error) {
                enqueueSnackbar('error: ' + error.message, { variant: "error" });
            });
    }

    //users delete
    const userDelete = (id) => {
        setOpen(true);
        axios.delete(deleteUser(id))
            .then((res, err) => {
                if (err) throw err
                if (res.status === 204) {
                    usersGet()
                    enqueueSnackbar("user deleted succesfully!", { variant: "success" });
                    setOpen(false);
                }
            }).catch(function (error) {
                enqueueSnackbar('error: ' + error.message, { variant: "error" });
            });
    }

    //users edit
    const userEdit = (userData) => {
        const users = [...data].map(x => x.id === userData.id ? userData : x)
        setOpen(true);
        axios.put(editUser(userData.id), userData)
            .then(function (response) {
                if (response.status === 201) {
                    usersGet()
                    enqueueSnackbar("user edited succesfully!", { variant: "success" });
                    setOpen(false);
                }
            })
            .catch(function (error) {
                enqueueSnackbar(error.message, { variant: "error" });
                setOpen(false);
            });
    }

    //users add
    const userAdd = (userData) => {
        setOpen(true);
        axios.post(addUser, userData)
            .then(function (response) {
                if (response.status === 201) {
                    usersGet()
                    setOpen(false);
                    enqueueSnackbar("user added succesfully!", { variant: "success" });
                }

            })
            .catch(function (error) {
                enqueueSnackbar(error.message, { variant: "error" });
                setOpen(false);
            });
    }

    //load data only once at start
    useEffect(() => {
        usersGet()
    }, []);

    return (
        <>
            <SimpleBackdrop open={open}></SimpleBackdrop>
            <FormDialog userAdd={userAdd} type="add"></FormDialog>
            <TableDefault userEdit={userEdit} userDelete={userDelete} data={data}></TableDefault>
        </>
    )
}
