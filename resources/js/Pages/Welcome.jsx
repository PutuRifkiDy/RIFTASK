import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const auth = usePage().props.auth?.user;

    return (
        <div>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 text-2xl font-black leading-relaxed tracking-[0.0625rem]">
                            RifsTasks<span className="text-indigo-500">.</span>
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        {auth ? (
                            <Link href={route('dashboard')} className="font-semibold text-2xl leading-relaxed tracking-[0.0625rem] text-foreground">
                                Dashboard <span aria-hidden="true">&rarr;</span>
                            </Link>
                        ) : (
                            <Link href={route('login')} className="font-semibold text-2xl leading-relaxed tracking-[0.0625rem] text-foreground">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        )}
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {auth ? (
                            <Link href={route('dashboard')} className="text-2xl font-semibold leading-relaxed tracking-[0.0625rem] text-foreground">
                                Dashboard <span aria-hidden="true">&rarr;</span>
                            </Link>
                        ) : (
                            <Link href={route('login')} className="text-2xl font-semibold leading-relaxed tracking-[0.0625rem] text-foreground">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        )}
                    </div>
                </nav>
            </header>

            <main className="isolate">
                <div className="relative pt-14">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-400 to-indigo-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div className="py-24 flex flex-col md:flex-row justify-between">
                        <div className="px-6 lg:px-8 flex flex-col justify-center">
                            <div className="mx-auto max-w-2xl text-center">
                                <h1 className="text-start text-4xl max-w-lg font-bold leading-relaxed tracking-tight text-foreground sm:text-6xl">
                                    Organize Your <span className="text-indigo-500">Tasks</span> and <span className="text-indigo-500">Plans</span> with <span className="text-indigo-500">Ease</span>
                                </h1>
                                <p className="text-start max-w-xl mt-6 text-lg leading-8 text-muted-foreground">
                                    Riftasks is an intuitive and user-friendly task management tool designed to help you stay productive and in control of your schedule.
                                    Easily organize your tasks, set priorities, and track progress to ensure nothing falls through the cracks.
                                </p>

                                <div className="mt-10 flex items-center justify-start gap-x-6">
                                    <Button variant="indigo" asChild>
                                        <Link href={route('login')}>Get started</Link>
                                    </Button>
                                    <Button variant="ghost" asChild>
                                        <Link href={route('login')}>
                                            Learn more <span aria-hidden="true">→</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="img-homePage mr-24">
                            <div className="home-img">
                                <img src="assets/rifki.png" alt="Foto Profil" />
                            </div>

                            {/* Label Teknologi dengan Ikon */}
                            {[
                                { src: "https://cdn.simpleicons.org/nextdotjs/black", text: "NextJS" },
                                { src: "https://cdn.simpleicons.org/tailwindcss/38BDF8", text: "Tailwind CSS" },
                                { src: "https://cdn.simpleicons.org/react/61DAFB", text: "ReactJS" },
                                { src: "https://cdn.simpleicons.org/javascript/F7DF1E", text: "JavaScript" },
                                { src: "https://cdn.simpleicons.org/php/777BB4", text: "PHP Native" },
                                { src: "https://cdn.simpleicons.org/figma/F24E1E", text: "Figma" },
                                { src: "https://cdn.simpleicons.org/laravel/F24E1E", text: "Laravel" }
                            ].map((item, index) => (
                                <div key={index} className={`label label-${index + 1}`}>
                                    <img src={item.src} alt={`${item.text} Icon`} className="icon-tool" />
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                    <div
                        className="to-indigo-600 opacity-30 relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-indigo-400 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </main>
        </div>
    );
}

Welcome.layout = (page) => <GuestLayout children={page} title="Home" />;
