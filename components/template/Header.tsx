import Link from "next/link"

function Header() {
  return (
    <header className="mx-auto flex max-w-7xl bg-slate-100 justify-between p-5">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <h2 className="text-lg cursor-pointer text-primary border-[1px] rounded-full py-2 px-4 border-primary font-semibold">
            Tech Test
          </h2>
        </Link>
      </div>
      <div className="flex items-center space-x-5 font-medium">
        <Link href="/add">
          <a className="bg-primary px-4 py-2 text-white rounded-full border-primary">Create Experiment</a>
        </Link>
      </div>
    </header>
  )
}

export default Header
