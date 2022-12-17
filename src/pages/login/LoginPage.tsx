import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import styles from "./Login.module.scss";

import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Snackbar, TextField} from "@mui/material";

import Button from "@mui/material/Button";
import {useAppDispatch} from "../../hook/hooks";

export const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const { status } = useSelector(initUser.login);
    const isRegistered = status === "success";

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: "", password: ""
        }, mode: "onChange"
    });

    const onSubmit = async (values:any) => {
        // const data = await dispatch(loginTC(values));
        // if (!data.payload) {
        //     alert("Не удалось авторизироваться...");
        // }
        // if (localStorage.getItem("token") || "token" in data.payload) {
        //     window.localStorage.setItem("token", data.payload.token);
        // } else {
        //     alert("Не удалось авторизоваться...");
        // }
    };

    if (isRegistered) {
        navigate("/");
    }

    return (
        <>
            {/*{status !== "success" && status !== "loading" &&*/}
            {/*    <Snackbar open anchorOrigin={{ vertical: "bottom", horizontal: "center" }}*/}
            {/*              message={status} />*/}
            {/*}*/}
            <Paper classes={{ root: styles.root }}>
                <Typography classes={{ root: styles.title }} variant="h5">
                   Welcome to Foodshare!
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        variant="filled"
                        type="email" className={styles.field}
                        label="E-Mail"
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        {...register("email", { required: "Enter email" })}
                        fullWidth
                    />
                    <TextField
                        variant="filled"
                        {...register("password", { required: "Enter password" })}
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message} className={styles.field}
                        label="Password"
                        fullWidth />

                    <Button type="submit" disabled={!isValid} className={!isValid ? styles.disable : styles.enable}>
                        Log In
                    </Button>

                    <NavLink className={styles.navLink} to="/forgot-username">Forgot password?</NavLink>
                    <NavLink className={styles.navLink} to="/forgot-password">Forgot password?</NavLink>
                </form>
            </Paper>
        </>

    );
};
