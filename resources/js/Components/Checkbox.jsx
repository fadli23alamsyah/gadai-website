export default function Checkbox({ id, name, value, handleChange, isChecked }) {
    return (
        <input
            id={id}
            type="checkbox"
            name={name}
            value={value}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            onChange={(e) => handleChange(e)}
            checked={isChecked ? "checked" : ""}
        />
    );
}
