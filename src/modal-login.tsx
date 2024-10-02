import React from "react";
import Modal from "./components/Modal";
import Input from "./components/Input";
import Button from "./components/Button";
import { IconArrowRight } from "./icons";
import useAuthToken from "./hooks/useAuthToken";
import { FINALLY_MAINNET } from "./global-constants";
import useToast from "./hooks/useToast";

const ModalLogin = () => {
  const [show, setShow] = React.useState(true);
  const [password, setPassword] = React.useState("");

  const onSubmit = (e: any) => {
    console.log(FINALLY_MAINNET === password.trim());
    if (FINALLY_MAINNET === password.trim()) {
      useAuthToken.setAuthTokenFromLocalStorage(true);
      setShow(false);
    } else {
      useToast().error("Password is wrong");
    }

    e.preventDefault();
  };

  React.useEffect(() => {
    if (useAuthToken.getAuthTokenFromLocalStorage()) {
      setShow(false);
    }
  }, []);

  return (
    <Modal show={show} className="backdrop-blur" title="Login" onClose={() => setShow(true)} backdropDisabled={true}>
      <form onSubmit={onSubmit} className="flex flex-col p-2 gap-5">
        <Input
          placeholder="Password"
          type="password"
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <Button className="btn-sm" onClick={onSubmit}>
          Login
          <IconArrowRight />
        </Button>
      </form>
    </Modal>
  );
};

export default ModalLogin;
