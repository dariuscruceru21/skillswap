export default function InputField({ id, label, type = "text", ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg input-field focus:outline-none focus:border-indigo-500"
        {...props}
      />
    </div>
  );
}
