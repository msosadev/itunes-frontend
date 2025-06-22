export default function Badge({ label }: { label: string }) {
    return (
        <div className="inline-block bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold p-0.5 rounded-full">
            <span className="bg-gray-900 font-bold rounded-full px-2 p-1 block">{label}</span>
        </div>
    );
}