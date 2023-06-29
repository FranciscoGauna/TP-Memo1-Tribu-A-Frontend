import Link from "next/link"
import { useRouter } from "next/router"
import SideBarItem from "./SidebarItem"
import { ISidebarItem } from "../types/components"

export default function Layout({ children }: { children: any }) {
  const menuItems: ISidebarItem[] = [
    /* {
      href: "/",
      title: "Homepage",
    }, */
    {
      href: "/proyectos",
      title: "Proyectos",
    },
    {
      href: "/recursos",
      title: "Recursos",
    },
    {
      href: "/soporte",
      title: "Soporte",
    },
    /* {
      href: "/clientes",
      title: "Clientes",
    },
    {
      href: "/usuarios",
      title: "Usuarios",
    } */
  ]

  	return (
	   <div className="min-h-screen flex flex-col bg-white">
	    	<div className="flex flex-col md:flex-row flex-1">
	      		<aside className="bg-grey-100 w-full md:w-60" style={{backgroundColor: "#0F3A61"}}>
	        		<div style={{display: 'flex', fontSize: 40, marginLeft: 30, marginTop: 30, marginBottom: 30, color: "#FFFFFF"}}>PSA</div>
	        		<nav>
	          			<ul>{menuItems.map((item) => (<SideBarItem {...item} key={item.title} />))}</ul>
	        		</nav>
	    		</aside>
	     	<main className="flex-1">{children}</main>
	    	</div>
		</div>
    )
}
