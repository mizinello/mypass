import React, { useContext } from "react";
import PropTypes from "prop-types";
import AccountContext from "../../context/account/accountContext";

const AccountItem = ({ account }) => {
  const accountContext = useContext(AccountContext);
  const { deleteAccount, setCurrent, clearCurrent } = accountContext;

  const { _id, name, username, password, type } = account;
  const onDelete = () => {
    deleteAccount(_id);
    clearCurrent();
  };
  return (
    <div className="card bg-light">
      <h3 className="text-1 text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "Mobile" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {username && (
          <li>
            <i className="fas fa-user-secret"></i> {username}
          </li>
        )}
        {password && (
          <li>
            <i className="fas fa-unlock-alt"></i> {password}
          </li>
        )}
      </ul>
      <p className="button-crud">
        <button
          className="btn btn-dark btn-sm" onClick={() => setCurrent(account)}
         
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={(e) =>{if(window.confirm('are you sure to delete this item?')) onDelete(e)}}>
          Delete
        </button>
      </p>
    </div>
  );
};

AccountItem.propTypes = {
  account: PropTypes.object.isRequired
};

export default AccountItem;






























