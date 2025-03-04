import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <GuestLayout title="Confirm Password">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Card>
                        <CardHeader className="flex flex-col items-center justify-center">
                            <Link href="/" className="text-4xl font-black leading-relaxed tracking-tighter">
                                RifsTasks<span className="text-red-500">.</span>
                            </Link>
                            <h2 className="text-left text-lg font-medium leading-9 tracking-tight text-muted-foreground">
                                This is a secure area of the application. Please confirm your password before
                                continuing.
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" onSubmit={submit}>
                                    {/* form */}
                                    <div>
                                        <InputLabel htmlFor="password" value="Password" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"
                                            isFocused={true}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError
                                            message={
                                                errors.email && <InputError message={errors.email} className="mt-2" />
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Button type="submit" variant="red" className="w-full" disabled={processing}>
                                            Confim
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </GuestLayout>
    );
}
