import React, { FC } from "react";
import { Avatar } from "src/components/Elements/Avatar";
import { Button } from "src/components/Elements/Button";
import { Modal } from "src/components/Elements/Modal";
import { Logo } from "src/components/Icon/Logo";
import { useGlobalState } from "src/store/global/globalStore";
import { useUserState } from "src/store/user/userState";

export const Header: FC = () => {
  const user = useUserState((state) => state.user);
  const authLoading = useGlobalState((state) => state.authLoading);
  const changeIsOpenModal = useGlobalState((state) => state.setIsOpenModal);

  return (
    <header className="w-full border-0 border-b border-solid border-slate-200">
      <div className="container mx-auto flex items-center justify-between px-6 py-2  md:px-10">
        <Logo />
        {user && !user.anonymous ? (
          <Avatar user_id={user.id} user_name={user.user_name} />
        ) : (
          <>
            <Button
              onClick={() => changeIsOpenModal(true)}
              size="xs"
              radius="md"
              loading={authLoading}
              className="btn-primary text-sm"
            >
              ログイン
            </Button>
            <Modal />
          </>
        )}
      </div>
    </header>
  );
};
