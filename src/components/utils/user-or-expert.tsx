import { ReactNode, FC } from "react";

type UserOrExpertProps = {
  isPerson: "user" | "expert";
  userComponent: ReactNode | null;
  expertComponent: ReactNode | null;
};

export const UserOrExpert: FC<UserOrExpertProps> = ({
  isPerson,
  expertComponent,
  userComponent,
}) => {
  return isPerson === "expert" ? expertComponent : userComponent;
};
