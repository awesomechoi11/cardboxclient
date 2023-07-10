export default function LabeledPills({ label, content }) {
    return (
        <div className="labeled-pills">
            <div className="mx-2 my-0 mb-2 font-bold text-blue-600">
                {label}
            </div>
            <div className="px-3 py-4 mx-2 my-0 font-bold text-blue-600 break-words rounded-lg">
                {content}
            </div>
        </div>
    );
}
