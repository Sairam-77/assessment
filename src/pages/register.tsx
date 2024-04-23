import { Box, Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    let navigate = useNavigate();
    let [loading, setLoading] = useState(false)

    const handelRegister = async (value: any) => {
        try {
            setLoading(true)
            console.log(value);
            let res = await axios.post('http://localhost:3000/register', value)

            if (res.status == 200) {
                navigate('/login')
            }
            setLoading(false)
            console.log(res);


        } catch (error: any) {
            setLoading(false)
            alert(error?.response?.data?.message);
            console.log(error);

        }
    }

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            firstName: (value) => value.length > 0 ? null : "firstname required",
            lastName: (value) => value.length > 0 ? null : "lastName required",
            userName: (value) => value.length > 0 ? null : "userName required",
            password: (value) => value.length >= 8 ? null : "password must be 8 characters",
            confirmPassword: (value, values) => values.password === value ? null : "password not match",
            termsOfService: (value) => value ? null : "termsOfService required"
        },
    });
    return <Box m={20}>
        <h1>Register</h1>
        <form onSubmit={form.onSubmit((values) => handelRegister(values))}>
            <TextInput
                withAsterisk
                label="First Name"
                placeholder=""
                {...form.getInputProps('firstName')}
            />
            <TextInput
                withAsterisk
                label="Last Name"
                placeholder=""
                {...form.getInputProps('lastName')}
            />
            <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
            />
            <TextInput
                withAsterisk
                label="userName"
                placeholder=""
                {...form.getInputProps('userName')}
            />
            <TextInput
                withAsterisk
                label="password"
                placeholder=""
                {...form.getInputProps('password')}
            />

            <TextInput
                withAsterisk
                label="confirmPassword"
                placeholder=""
                {...form.getInputProps('confirmPassword')}
            />

            <Checkbox
                mt="md"
                label="I agree to sell my privacy"
                {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />

            <Group justify="flex-end" mt="md">
                <Button type="submit" loading={loading}>Submit</Button>
            </Group>
        </form>
    </Box>;
};

export default Register;
