export default function WhiteCard({ cls, children }) {
  return (
    <div
      className={`${cls}  min-h-[10rem] py-3 px-5 rounded
       `}
      style={{
        boxShadow:
          "0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.2",
      }}
    >
      {children}
    </div>
  );
}
