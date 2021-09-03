import React, { useContext, useRef, useEffect } from "react";
import AccountContext from "../../context/account/accountContext";

const AccountFilter = () => {
  const accountContext = useContext(AccountContext);
  const { filterAccounts, clearFilter, filtered } = accountContext;

  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      filterAccounts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input  
        ref={text}
        type="text"
        placeholder="Search Account"
        onChange={onChange}
      />
    </form>
   )
};


export default AccountFilter;
