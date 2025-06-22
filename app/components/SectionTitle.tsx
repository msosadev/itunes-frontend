export default function SectionTitle({ title }: { title: string }) {
    return (
        <div className="text-2xl font-bold mb-4 mt-6 space-y-2">
            <h2>{title}</h2>
            <div className="bg-gradient-to-r from-primary to-secondary h-0.5"></div>
        </div>
    );
}