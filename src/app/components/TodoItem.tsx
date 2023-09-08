// default is everything is a server component. We must convert this to a client side component (bc we have an onChange and need interaction on client) We do this by adding "use client" at top of the file

"use client"


type TodoItemProps = {
  id: string
  title: string
  complete: boolean
  toggleTodo: (id:string, complete: boolean) => void
}

export default function TodoItem({ id, title, complete, toggleTodo }: TodoItemProps) {
  return (
  <li className="flex gap 1 items-center">
    <input 
      type="checkbox" 
      id={id} 
      className ="cursor-pointer peer"
      defaultChecked={complete}
      onChange={e => toggleTodo(id, e.target.checked)}/>
    <label 
    htmlFor={id} 
    className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500">
      {title}
    </label>
  </li>

)}

