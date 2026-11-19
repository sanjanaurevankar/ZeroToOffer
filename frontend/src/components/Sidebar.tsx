import { NavLink } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuCode,
  LuRepeat2,
  LuBuilding2,
  LuChartBar,
  LuUser,
} from "react-icons/lu";

// Pages that exist and have real routes.
const links = [
  { to: "/dashboard", label: "Dashboard", icon: LuLayoutDashboard },
  { to: "/questions", label: "DSA Tracker", icon: LuCode },
];

// Planned pages (per the roadmap) that aren't built yet - shown but
// disabled instead of being dead links, so the sidebar stays honest about
// what actually works right now.
const comingSoon = [
  { label: "Revision Planner", icon: LuRepeat2 },
  { label: "Company Questions", icon: LuBuilding2 },
  { label: "Analytics", icon: LuChartBar },
  { label: "Profile", icon: LuUser },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      <ul>
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active" : ""}`
              }
            >
              <Icon />
              {label}
            </NavLink>
          </li>
        ))}

        {comingSoon.map(({ label, icon: Icon }) => (
          <li key={label}>
            <span className="sidebar-link disabled">
              <Icon />
              {label}
              <span className="soon-tag">soon</span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;