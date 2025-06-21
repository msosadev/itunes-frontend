export default function Badge({ label }: { label: string }) {
    return (
        <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {label}
        </span>
    );
}