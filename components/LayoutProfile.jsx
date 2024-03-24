import SideBarProfile from "./SideBarProfile"

const LayoutProfile = ({ children }) => {
  return (
    <div className="flex">
      <div className="hidden w-1/6 md:flex">
        <SideBarProfile />
      </div>
      <div className="md:w-5/6 sm:w-full">{children}</div>
    </div>
  )
}

export default LayoutProfile
