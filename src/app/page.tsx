//following tutproial https://www.youtube.com/watch?v=NgayZAuTgwM&t=247s

// this page.tsx is the root of the applicaiton url -- /

import { prisma } from "./db"
import Link from "next/link"
import TodoItem from "./components/TodoItem"

 // with app router (which is configured in initilization of app), we can call server code inside components

// would prob move this to a different folder for similar functions 

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

await prisma.todo.update({ where: { id }, data: { complete } })

}


export default async function Home() {

  const todos = await getTodos()

  return <>
    <header className="flex justify-between items-center mb-4" >
      <h1 className="text-2xl">To-Do's</h1>
      <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>

      <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
          
        ))}
      </ul>

    
  
  </>
}