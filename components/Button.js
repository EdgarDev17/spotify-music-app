
export default function Button({handleLoginBtn, label}) {
  return (
    <button className="bg-black text-white px-7 py-3 rounded" onClick={handleLoginBtn}>{label}</button>
  )
}
