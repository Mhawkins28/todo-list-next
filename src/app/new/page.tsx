// routing in Next.js works by creating a folder with the name of the route and a file called page.tsx inside it (essentially an index file). -- /new is will be the route
import Link from "next/link"
import { prisma } from "../db"
import { redirect } from "next/navigation"

async function createTodo(data: FormData) {
  "use server"
// had to add experimental tag to next.config

const title = data.get("title")?.valueOf()
if (typeof title !== "string" || title.length === 0) {
  throw new Error("Title is required")
}

await prisma.todo.create({data: {title: title, complete: false} })
redirect("/")


  // console.log("hi") -- This log only shows up on the server (terminal), not the client side (browser)
  // This is making the fetch request for you and handling the complexities of loading and errors for you
}


export default function New() {
  return <>
  <header className="flex justify-between items-center mb-4" >
      <h1 className="text-2xl">New</h1>
      </header>
<form 
  action={createTodo}
  className="flex gap-2 flex-col mb-4">
  <input 
    type="text" 
    name="title"
    className="border border-slate-300 text-slate-300 px-2 py-1 rounded outline-none focus-within:border-slate-100 " 
    />
  <div className="flex gap-1 justify-end">
    <Link 
    href=".."
    className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
    >Cancel</Link>  

    <button
      type="submit"
      className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
    >Create</button>
  </div>
</form>
  </>

}