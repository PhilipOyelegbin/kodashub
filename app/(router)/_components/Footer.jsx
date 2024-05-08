
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-700 text-slate-200 text-center p-5 lg:px-20">
      <p>&copy; {year} :: All rights reserverd</p>
    </footer>
  )
}
