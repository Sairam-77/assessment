import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    let navigate = useNavigate();
    let [loading, setLoading] = useState(false)

    const handelLogin = async (value: any) => {

        console.log(value);

        try {
            setLoading(true)
            console.log(value);
            let res = await axios.post('http://localhost:3000/login', value)

            if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/home');
            }
            setLoading(false)
            console.log(res?.data?.user);


        } catch (error: any) {
            setLoading(false)
            alert(error?.response?.data?.message);
            console.log(error);

        }
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            password: '',

        },

        validate: {
            name: (value) => value.length > 0 ? null : "username or email required",
            password: (value) => value.length >= 8 ? null : "password must be 8 characters",

        },
    });
    return <Box m={20}>

        <h1>Login</h1>
        <form onSubmit={form.onSubmit((values) => handelLogin(values))}>
            <TextInput
                withAsterisk
                label="Email or userName"
                placeholder=""
                {...form.getInputProps('name')}
            />
            <TextInput
                withAsterisk
                label="Password"
                placeholder=""
                {...form.getInputProps('password')}
            />


            <Group justify="flex-end" mt="md">
                <Button type="submit" loading={loading}>Login</Button>

            </Group>
        </form>
    </Box>;
};
