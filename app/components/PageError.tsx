import { FileQuestionMark } from "lucide-react";
import { Link } from "react-router";

export default function PageError({ title, description }: { title?: string; description?: string }) {
    return (
        <div className="wrapper h-full flex gap-1.5 items-center justify-center flex-col text-center">
            <FileQuestionMark />
            <h1 className="text-2xl font-bold">{title ? title : "Unexpected error"}</h1>
            {description ? <p className="text-gray-500">{description}</p> : ""}
            <Link to="/">Home</Link>
        </div>
    );
}