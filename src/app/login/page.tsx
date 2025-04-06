import { Container } from '@/components/container';
import { LoginForm } from '@/components/login-form';
export default async function LoginPage() {
    return (
        <Container className="mx-none justify-center flex items-center">
            <LoginForm />
        </Container>
    );
}
