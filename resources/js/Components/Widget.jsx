import { cn } from "@/lib/utils";

export default function Widget({ classname, ...props }) {
    const { bgColor, count, icon, title } = props;
    return (
        <div className={cn('relative overflow-hidden rounded-lg border bg-white px-4 pb-6 pt-5 sm:pt-6', classname)}>
            <div>
                <div className={cn('absolute rounded-2xl p-3', bgColor)}>{icon}</div>
                <p className="ml-16 text-sm font-medium truncate text-muted-foreground">{title}</p>
            </div>
            <div className="ml-16 flex items-baseline">
                <p className="text-foreground font-semibold text-2xl">{count}</p>
            </div>
        </div>
    );
}
