export default function LabeledPills({ label, content }) {
    return (
        <div className="labeled-pills">
            <div className="label  subtitle-2">{label}</div>
            <div className="content  subtitle-2">{content}</div>
        </div>
    );
}
