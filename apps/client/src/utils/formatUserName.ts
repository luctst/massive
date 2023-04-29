import { UserStore } from "@/types";

export default function formatName(userData: UserStore) {
  if (userData.provider === 'google') {
    const splitUsername = userData.username.split('.');

    return `${splitUsername[0]}.${splitUsername[1][0].toUpperCase()}`;
  }

  return `${userData.firstname} ${userData.lastname[0].toUpperCase()}`;
}
