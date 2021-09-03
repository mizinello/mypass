import React, { useState, useContext, useEffect } from "react";
import AccountContext from "../../context/account/accountContext";

const AccountForm = () => {
  const accountContext = useContext(AccountContext);

  const { addAccount, current, clearCurrent, updateAccount } = accountContext;

  useEffect(() => {
    if (current !== null) {
      setAccount(current);
    } else {
      setAccount({
        name: "",
        username: "",
        password: "",
        type: "Website"
      });
    }
  }, [accountContext, current]);

  const [account, setAccount] = useState({
    name: "",
    username: "",
    password: "",
    type: "Website"
  });
  // eslint-disable-next-line
  const { name, username, password, type } = account; 

  const onChange = e =>
    setAccount({ ...account, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addAccount(account);
    } else {
      updateAccount(account);
    }
    setAccount({
      name: "",
      username: "",
      password: "",
      type: "Website"
    });
  };

  const clearAll = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h3 className="text-primary">{current ? "Edit Account" : "Add Account"}</h3>
      <input
        type="text"
        name="name"
        placeholder="URL"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={onChange}
      />
       <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={onChange}
      /> 
     
      <h3>Account Type</h3>
      <input
        type="radio"
        name="type"
        value="website"
        checked={type === "Website"}
        onChange={onChange}
      />
      Website{" "}
      <input
        type="radio"
        name="type"
        value="mobile"
        checked={type === "Mobile"}
        onChange={onChange}
      />
      Mobile{" "}
      <div>
        <input
          type="submit"
          value={current ? "Update Account" : "Add Account"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default AccountForm;
