import * as React from "react"

export function useSidebar() {
  const [open, setOpen] = React.useState(false)
  const [openMobile, setOpenMobile] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setOpen(!open)
  }

  return {
    state: open ? "expanded" : "collapsed",
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  }
} 