import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import './breadCrumbs.scss'

const BreadCrumbs = ({ history }) => {
  if (!history || history.length === 0) return null;

  return (
    <nav className="breadCrumbs">
      <ul>
        {history.map((crumb, index) => {
          const isLast = index === history.length - 1;

          return (
            <React.Fragment key={index}>
              <li className={isLast ? "active" : ""}>
                {isLast ? (
                  <span>{crumb.label}</span>
                ) : (
                  <Link to={crumb.path}>{crumb.label}</Link>
                )}
              </li>
              {index < history.length - 1 && (
                <span className="arrow"><FaLongArrowAltRight /></span>
              )}
            </React.Fragment>
          )
        })}
      </ul>
    </nav>
  )
}

export default BreadCrumbs;