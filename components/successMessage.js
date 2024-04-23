export default function SuccessMessage({ message }) {
  return (
    <>
      {message && (
        <p className="bg-emerald-300 px-2 py-3 my-3 text-emerald-600 capitalize font-bold text-[0.9rem] border-solid border-emerald-700 rounded border-1">
          {message}
        </p>
      )}
    </>
  );
}
