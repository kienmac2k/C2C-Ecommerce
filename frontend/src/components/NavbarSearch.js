import React from "react";
import { useHistory } from "react-router-dom";
const NavbarSearch = () => {
  const history = useHistory();
  const ref = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?name=${ref.current.value}`);
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          ref={ref}
          type="text"
          placeholder="Search for Templates, Pictures, Music and More"
        />
      </form>
    </>
  );
};
export default NavbarSearch;
