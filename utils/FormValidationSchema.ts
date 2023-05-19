import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    password: Yup.string().required('Required').test('password', 'Password must be at least 8 characters', value => {
        return value?.length >= 8;
    }),
    confirmPassword: Yup.string().required('Required').test('password', 'Password must be at least 8 characters', value => {
        return value?.length >= 8;
    }).test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
    }),
    email: Yup.string().email('Invalid email').required('Required').test('email', 'Invalid email', value => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value || '');
    }),
});
